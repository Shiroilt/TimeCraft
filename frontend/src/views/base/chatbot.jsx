import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatbot.css"; // Custom styles for better appearance
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [profile, setProfile] = useState({});

  const userData = UserData();

  useEffect(() => {
    let isMounted = true;

    if (userData?.user_id && !profile.id) { // ✅ Prevent repeated calls
      console.log("Fetching profile...");
      apiInstance.get(`user/profile/${userData.user_id}/`)
        .then((res) => {
          if (isMounted) setProfile(res.data);
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }

    return () => { isMounted = false; }; // ✅ Cleanup function
  }, [userData, profile]);
  

  
  // Function to send messages to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/send-message/", 
        { message: input },  // No need to JSON.stringify()
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
    
      const botReply = response.data.response || "I'm here to assist you with invitation cards and designs!";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("❌ Chatbot API Error:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to the chatbot. Try again later." }]);
    }          
  };

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {/* Toggle Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
       Chat with Us!
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-box card shadow-lg">
          <div className="chatbot-header d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
              <img src="logo.svg" alt="Chatbot" className="chatbot-icon" />
              <h5 className="ms-2 mb-0">FAQ ChatBot</h5>
            </div>
            <button className="btn-close" onClick={() => setIsOpen(false)} style={{backgroundColor:"white",border:"1px"}}></button>
          </div>

          {/* Chat Messages */}
          <div className="chatbot-messages p-3">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                {msg.sender === "bot" ? (
                  <img src="robo.jpg" alt="bot" className="chat-icon" />
                ) : (
                  <img src={profile.image} alt="user" className="chat-icon" />
                )}
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Chat Input */}
          <div className="chatbot-input p-2 d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="sendbut" onClick={sendMessage} style={{width:"40px",border:"1px solid gray"}}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;