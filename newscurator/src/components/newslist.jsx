import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Styles/newslist.css";

const NewsList = ({ category = "common" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const toDate = today.toISOString().split('T')[0];

        let fromDate = new Date();
        fromDate.setDate(today.getDate() - 3);
        fromDate = fromDate.toISOString().split('T')[0];

        const queryParams = new URLSearchParams({
          from: fromDate,
          to: toDate,
          pageSize: 10,
          apiKey: "debb061ae90b454f8fc1dc5daa97f6ec"
        });

        if (category && category.trim() !== '' && category !== "common") {
          queryParams.append('q', category);
        } else {
          queryParams.append('sources', 'bbc-news');
        }

        const response = await axios.get(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`);

        if (response.status === 200) {
          const data = response.data;

          if (data.status === "ok") {
            const articlesWithImages = data.articles
              .filter(article => article.urlToImage && article.urlToImage.trim() !== '');

            const shuffledArticles = articlesWithImages
              .sort(() => 0.5 - Math.random())
              .slice(0, 10);

            setArticles(shuffledArticles);
          } else {
            throw new Error(data.message || "Failed to fetch articles");
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const handleCardClick = (article) => {
    navigate(`/news/${article.title}`, { state: { article } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="list-cell">
      <div className="list-header">
        <h1>{category === "common" ? "Common News" : "Top Stories"}</h1>
      </div>
      {articles.map((article) => (
        <div className="cell-content" key={article.url} onClick={() => handleCardClick(article)} style={{ cursor: 'pointer' }}>
          <div className="item item-thumbnail" style={{ backgroundImage: `url(${article.urlToImage})` }}>
            <div className="thumbnail-pill">
              <p>{article.source.name}</p>
            </div>
          </div>
          <div className="item item-label">
            <h2 className="headline">{article.title}</h2>
            <div className="spacer2"></div>
            <p className="item-context">{article.description}</p>
            <div className="spacer"></div>
            <div className="label-description">
              <p>
                <strong>{new Date(article.publishedAt).toLocaleTimeString()}</strong> by {article.author || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
