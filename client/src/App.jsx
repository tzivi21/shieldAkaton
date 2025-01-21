import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/default/getAllPosts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const getBackgroundColor = (isSuicide, score) => {
    if (isSuicide) {
      return score < 0.9943 ? 'rgb(222, 222, 175)' : 'rgb(231, 154, 154)';
    }
    return 'rgb(199, 231, 199)';
  };

  return (
    <div className="container">
      <h1>posts</h1>
      <div className="posts-container">
        {posts.map((post, index) => (
          <div
            key={index}
            className="post-card"
            style={{
              backgroundColor: getBackgroundColor(post.isSucicide, post.suicide_rate[0].score)
            }}
          >
            <h2>{post.username}</h2>
            <p>{post.content}</p>
            {post.isSucicide && <p>suicide score: {(post.suicide_rate[0].score * 100).toFixed(2)}%</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;