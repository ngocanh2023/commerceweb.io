import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Livechat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: username,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log("messageData", messageData)
      await socket.emit("chat_message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("chat_message").on("chat_message", (data) => {
      console.log('------', data)
      setMessageList((list) => [...list, data]);
    });
  },[socket]);

  // console.log('currentMessage', currentMessage)
  // console.log('messageList', messageList)
  // console.log('socket', orderSocket)

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="livechat">LIVE CHAT</div>
        {/* <div className="appChat" onClick={() => { navigate(window.location.href="") }}>Chat Application</div> */}
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            console.log("message", messageContent.message);
            return (
              <div
                key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Livechat;
