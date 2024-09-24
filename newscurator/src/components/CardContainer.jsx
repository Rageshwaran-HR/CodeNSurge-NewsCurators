import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./cards"; // Ensure this path is correct
import "../Styles/cardContainer.css"; // Ensure this path is correct

const CardContainer = ({ category = "general" }) => { // Default to "general" if no category is provided
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const toDate = today.toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
    
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);
        const fromDate = threeDaysAgo.toISOString().split('T')[0]; // Date 3 days ago in 'YYYY-MM-DD' format
    
        const queryParams = new URLSearchParams({
          sources: 'bbc-news',
          from: fromDate,
          to: toDate,
          pageSize: 7,
          apiKey: "09b7f7ca19274739a729efbde426cdde" // Include the API key here
        });
    
        if (category && category.trim() !== '' && category !== "general") {
          queryParams.append('q', category);
          queryParams.delete('sources');
        }
    
        console.log(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`);
        
        // Use axios to fetch data
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`);

        if (response.status === 200) {
          const data = response.data;
          
          if (data.status === "ok") {
            const shuffledArticles = data.articles
              .filter(article => article.urlToImage && article.urlToImage.trim() !== '') // Filter articles with images
              .sort(() => 0.5 - Math.random()); // Shuffle the articles
              console.log(shuffledArticles.slice(0, 7));
            setArticles(shuffledArticles.slice(0, 7)); // Get top 7 articles
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card-container" sty>
      <header className="card-container-header">
        <h1 className="header-title">{category === "general" ? "Trending News" : "Top Stories"}</h1>
        <p className="sub-header">Catch up with the latest and most popular stories</p>
      </header>
      <div className="row">
        {articles.slice(0, 4).map((article, index) => (
          <Card key={index} article={article} />
        ))}
      </div>
      <div className="row">
        {articles.slice(4, 7).map((article, index) => (
          <Card key={index + 4} article={article} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
