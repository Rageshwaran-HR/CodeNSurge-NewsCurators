import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/Carousel.css';

const Carousel = () => {
  const [postIndex, setPostIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const controls = useAnimation();
  const postsRef = useRef([]);
  const { category } = useParams();
  const navigate = useNavigate();
  
  const handlePostClick = index => {
    setPostIndex(index);
    setProgressWidth(0);
    disablePostsTemporarily();
  };

  const handleReadMore = (article) => {
    navigate(`/news/${article.title}`, { state: { article } }); // Pass article details to NewsDetails
  };

  const disablePostsTemporarily = () => {
    // Check if postsRef.current is properly populated
    if (postsRef.current.length > 0) {
      postsRef.current.forEach(post => {
        if (post) { // Check if post is not null
          post.classList.add('post--disabled');
        }
      });
  
      setTimeout(() => {
        postsRef.current.forEach(post => {
          if (post) { // Check if post is not null
            post.classList.remove('post--disabled');
          }
        });
      }, 2500);
    } else {
      console.warn('postsRef.current is empty or not populated.');
    }
  };
  

  const fetchNewsArticles = async () => {
    try {
      const today = new Date();
      const toDate = today.toISOString().split('T')[0]; 
  
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);
      const fromDate = threeDaysAgo.toISOString().split('T')[0];
  
      const queryParams = new URLSearchParams({
        sources:'bbc-news',
        from: fromDate,
        to: toDate,
        pageSize: 3,
        apiKey:"debb061ae90b454f8fc1dc5daa97f6ec"
      });
  
      if (category && category.trim() !== '') {
        queryParams.append('q', category);
        queryParams.delete('sources');
      }
  
      console.log(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`);
  
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?${queryParams.toString()}`);
  
      const articlesWithImages = response.data.articles.filter(article => {
        return article.urlToImage && article.urlToImage.trim() !== '';
      });
  
      console.log(articlesWithImages);
  
      setCarouselData(articlesWithImages);
    } catch (error) {
      console.error("Error fetching news articles: ", error.response ? error.response.data : error.message);
    }
  };
  
  

  useEffect(() => {
      fetchNewsArticles();
  }, [category]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth(prev => {
        if (prev === 100) {
          setPostIndex(prevIndex => (prevIndex + 1) % carouselData.length);
          return 0;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [carouselData]);

  
  useEffect(() => {
    setProgressWidth(0);
    controls.start({ opacity: 1, x: 0 });
  }, [controls, postIndex]);

  return (
    <div className="carousel">
      <div className="progress-bar progress-bar--primary hide-on-desktop">
        <div className="progress-bar__fill" style={{ width: `${progressWidth}%` }}></div>
      </div>

      <header className="main-post-wrapper">
        <div className="slides">
          {carouselData.map((data, index) => (
            <motion.article
              key={index}
              className={`main-post ${index === postIndex ? 'main-post--active' : 'main-post--not-active'}`}
              ref={el => (postsRef.current[index] = el)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: index === postIndex ? 1 : 0, x: index === postIndex ? 0 : -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="main-post__image">
                <img src={data.urlToImage} alt={`Post ${index}`} loading="lazy" />
              </div>
              <div className="main-post__content">
                <div className="main-post__tag-wrapper">
                  <span className="main-post__tag">News</span>
                </div>
                <h1 className="main-post__title">{data.title}</h1>
                <a 
                  className="main-post__link" 
                  onClick={() => handleReadMore(data)} // Add onClick to navigate to NewsDetails
                >                  <span className="main-post__link-text">find out more</span>
                  <svg className="main-post__link-icon main-post__link-icon--arrow" width="37" height="12" viewBox="0 0 37 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6H36.0001M36.0001 6L31.0001 1M36.0001 6L31.0001 11" stroke="white" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </header>
      <div className="posts-wrapper hide-on-mobile">
        {carouselData.map((data, index) => (
          <motion.article
            key={index}
            className={`post ${index === postIndex ? 'post--active' : ''}`}
            ref={el => (postsRef.current[index] = el)}
            onClick={() => handlePostClick(index)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: index === postIndex ? 1 : 0.5, scale: index === postIndex ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${progressWidth}%` }}></div>
            </div>
            <header className="post__header">
              <span className="post__tag">News</span>
              <p className="post__published">{new Date(data.publishedAt).toDateString()}</p>
            </header>
            <h2 className="post__title">{data.title}</h2>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
