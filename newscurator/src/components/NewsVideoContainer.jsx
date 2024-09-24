import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/newsVideoContainer.css"; // Assuming the updated CSS is saved here

const NewsVideoContainer = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const apiKey = "AIzaSyA5UJG_sQQ3gZFZiI9-kOYUk_YnVjlPJKU";

  useEffect(() => {
    const fetchNewsVideos = async () => {
      try {
        // Get today's date in ISO 8601 format
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

        // Get the start and end of yesterday
        const startOfYesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString();
        
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`, {
            params: {
              part: 'snippet',
              q: category ? `news-${category}` : 'indian-news',
              type: 'video',
              order: 'viewCount', // Sort by most viewed
              maxResults: 5,
              publishedAfter: startOfYesterday, // Fetch videos from the start of yesterday
              publishedBefore: startOfToday, // Fetch videos up to the start of today
              key: apiKey
            }
          }
        );

        console.log("Start of Yesterday:", startOfYesterday);
        console.log("Start of Today:", startOfToday);
        console.log("API Response:", response.data);

        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching news videos", error.response ? error.response.data : error.message);
      }
    };

    if (apiKey) {
      fetchNewsVideos();
    }
  }, [category, apiKey]);

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="container">
      {/* Right content: Video list */}
      <div className="right-content">
        <h2>News Videos</h2>
        {videos.map((video, index) => (
          <div
            key={index}
            className="video-item"
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            {/* Video thumbnail */}
            <div className="video-thumbnail">
              <img src={video.snippet.thumbnails.high.url} alt="Video thumbnail" />
            </div>

            {/* Video details */}
            <div className="video-details">
              {/* Channel name */}
              <div className="channel-name">
                <span>{video.snippet.channelTitle}</span>
              </div>
              
              {/* Video title */}
              <h3>{video.snippet.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsVideoContainer;
