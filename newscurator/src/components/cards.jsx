import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/card.css";

const Card = ({ article }) => {
  const navigate = useNavigate();

  if (!article) return null;

  const {
    urlToImage = "https://picsum.photos/370/235",
    publishedAt = new Date().toISOString(),
    source = { name: "Unknown Source" },
    title = "No Title",
    url = "#",
    description = "No Description",
    content = "No Content",
  } = article;

  const readTime = content ? Math.round(content.length / 200) : "N/A";
  const comments = Math.floor(Math.random() * 100);

  const handleClick = () => {
    navigate(`/news/${encodeURIComponent(url)}`, {
      state: { article },
    });
  };

  return (
    <div className="bg" onClick={handleClick} style={{ cursor: "pointer"}}>
      <article className="card">
        <div className="thumb">
          <img src={urlToImage} alt="Thumbnail" />
        </div>
        <div className="date">
          <span className="day">{new Date(publishedAt).getDate()}</span>
          <span className="month">{new Date(publishedAt).toLocaleString('default', { month: 'short' })}</span>
        </div>
        <div className="body">
          <div className="category"><a href="#">{source.name}</a></div>
          <h2 className="title">{title}</h2>
          <div className="subtitle">Read More ...</div>
          <p className="description">
            {description ? (description.length > 200 ? `${description.slice(0, 200)}...` : description) : 'No description available'}
          </p>
        </div>
        <footer className="footer">
          <span className="icon icon-time"></span>{readTime} min. read
          <span className="icon icon-comment"></span><a href="#">{comments} comments</a>
        </footer>
      </article>
    </div>
  );
};

export default Card;
