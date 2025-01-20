import React, { useState } from 'react';
import {containsWordsIgnoreCase} from "./Logic"
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [percentage,setPercentage]=useState(0);

  const handlePost = async() => {
    let percentage =await  containsWordsIgnoreCase(text);
    setPercentage(percentage);
    
    if (percentage >= 80) {
      const newMessage = {
        user: 'USER_NAME',
        location: 'USER_LOCATION',
        content: text,
      };
      setMessages([...messages, newMessage]);
    }
    setText('');
  };

  return (
    <div className="container">
      <div className="left-side">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter yout text here..."
          className="input-text"
        />
        <button onClick={handlePost} className="post-button">POST</button>
      </div>

      <div className="right-side">
        {messages.map((msg, index) => (
          <div key={index} className="message-card">
            <h4>{msg.user} ({msg.location})</h4>
            <p>{msg.content}</p>
            <p className="warning">{ `notification!! suicidal post (${percentage}%)`} .</p>
            <button className="action-button">הפעל חקירה</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
