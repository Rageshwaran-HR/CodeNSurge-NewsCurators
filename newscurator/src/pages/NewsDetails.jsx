import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../Styles/NewsDetails.css';

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  const [paragraphs, setParagraphs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    if (article && article.url) {
      const fetchFullContent = async () => {
        try {
          const source = article.url.includes("cnn") ? "cnn" : "bbc";
          const response = await axios.get(
            `https://newsapi-d0fc.onrender.com/scrape/${source}?url=${encodeURIComponent(article.url)}`
          );
          console.log(response.data.paragraphs);
          setParagraphs(response.data.paragraphs || []);
        } catch (error) {
          console.error('Error fetching content:', error);
          setError('Error fetching content');
        } finally {
          setLoading(false);
        }
      };

      fetchFullContent();
    } else {
      setLoading(false);
      setError('Article URL not available');
    }
  }, [article]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!article) {
    return <div className="not-found">Article not found!</div>;
  }

  // Combine paragraphs into groups of 5 to 10
  const groupedParagraphs = [];
  for (let i = 0; i < paragraphs.length; ) {
    const groupSize = Math.floor(Math.random() * 6) + 5; // Random group size between 5 and 10
    groupedParagraphs.push(paragraphs.slice(i, i + groupSize));
    i += groupSize; // Move the index forward by the group size
  }

  return (
    <div className="news-detail">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <header className="news-header">
        <h1 className="noticia-text-bold">{article.title}</h1>
        <p className="published-date">{new Date(article.publishedAt).toDateString()}</p>
      </header>
      <div className="news-image">
        <img src={article.urlToImage} alt={article.title} />
      </div>
      <section className="news-content">
        {groupedParagraphs.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          >
            {group.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default NewsDetails;
