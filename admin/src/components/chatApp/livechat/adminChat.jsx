import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Livechat({ socket, username }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: username,
        author: "admin",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log("messageData", messageData);

      await socket.emit("chat_message", messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("chat_message").on("chat_message", (data) => {
      console.log('------', data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatUser-window">
      {/* <div className="chat-header">Customer Service</div>
      <div>Let's Chat App</div> */}
      <div className="userChat-body">
        <ScrollToBottom className="messageUser-container">
          {messageList.map((messageContent, i) => {
            console.log("messageList111", messageList);
            console.log("messageContent111", messageContent);

            return (
              <div
                key={i}
                className="messageUser"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="msnCon">
                  <div className="messageUser-content" id={username === messageContent.author ? "you" : "other"}>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="messageUser-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chatUser-footer">
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
        <div className="btnSend">
          <button onClick={sendMessage} className="btnSend">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path
                  style={{ fill: "green" }}
                  d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
                />
              </svg>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Livechat;
