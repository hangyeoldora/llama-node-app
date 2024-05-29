import React, { useState, useEffect,useRef, useContext } from 'react';
import '../../assets/css/global.css';
import '../../assets/css/index.css';
import MyAvatar from "../../assets/images/panda.png";
import TriangleMarker from "../../assets/images/triangle-marker.svg"
import ChatgptIcon from "../../assets/images/chatgpticon-2@2x.png"
import CopyIcon from "../../assets/images/copy.svg"
import ThumbDownIcon from "../../assets/images/thumbsdown.svg"
import ThumbUpIcon from "../../assets/images/thumbsup.svg"
import PolygonIcon from "../../assets/images/polygon-3.svg"
import SendIcon from "../../assets/images/send.svg"

function ChatMessage({ message, type }) {
  return (
    <div
      className={`flex w-full ${
        type === 'send' ? 'justify-start' : 'justify-end'
      }`}
    >
      {type === 'send' ? (
        <div className='chat-content'>
          <div className='screenshot-container'>
            <div className='screenshot-circle'></div>
            <img
              className='screenshot-2023-03-15-at-550'
              loading='lazy'
              alt=''
              src={MyAvatar}
            />
          </div>
          <div className='chat-history'>
            <button className='grid-info'>
              <div className='grid-info-child'></div>
              <div className='importance-of-grid1'>{message}</div>
              <img
                className='triangle-marker-icon'
                alt=''
                src={TriangleMarker}
              />
            </button>
          </div>
          
        </div>
      ) : (
        <div className='chat-g-p-t-response'>
            <div className='response-content'>
              <div className='grid-explanation'>
                <div className='grid-explanation-child'></div>
                <div className='grids-are-an-container'>
                  <p className='grids-are-an'>
                    {message}
                  </p>
                </div>
                <div className='response-actions'>
                  <div className='action-panel'>
                    <div className='feedback-buttons'>
                      <div className='feedback-buttons-child'></div>
                      <img
                        className='copy-icon'
                        loading='lazy'
                        alt=''
                        src={CopyIcon}
                      />
                    </div>
                    <div className='like-dislike'>
                      <div className='like-dislike-child'></div>
                      <div className='thumb-buttons'>
                        <img
                          className='thumbs-down-icon'
                          loading='lazy'
                          alt=''
                          src={ThumbDownIcon}
                        />
                      </div>
                      <div className='button-divider'></div>
                      <div className='thumb-buttons1'>
                        <img
                          className='thumbs-up-icon'
                          loading='lazy'
                          alt=''
                          src={ThumbUpIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className='content-marker-icon'
                  loading='lazy'
                  alt=''
                  src={PolygonIcon}
                />
              </div>
            </div>
            <div className='response-icon'>
              <div className='chat-g-p-t-icon'></div>
              <img
                className='chatgpt-icon-2'
                loading='lazy'
                alt=''
                src={ChatgptIcon}
              />
            </div>
          </div>
      )}
    </div>
  );
}

const Index = ({ newSocket }) => {
  useEffect(() => {
    newSocket.on('response', (message) => {
      console.log('response');
      console.log('message: ');
      setMessages((prev) => [
        ...prev,
        {
          type: 'reveive',
          message,
        },
      ]);
    });
  }, []);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    console.log('click');
    setMessages((prev) => [...prev, { type: 'send', message: inputMessage }]);
    setInputMessage('');
    newSocket.emit('message', inputMessage);
  };

  return (
    <>
      <section className='chat-window w-[100vw] h-full p-5 flex justify-center items-center'>
        <div className='chat-panel h-full overflow-y-auto'>
          <div className='block w-full h-full'>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                type={message.type}
              />
            ))}
          </div>
        </div>
        <div className='input-area'>
            <div className='input-panel'>
              <div className='input-fields'>
              </div>
              <div className='input-button-parent flex justify-end items-end'>
                <div className='input-controls h-full'>
                  <input
                    type='text'
                    className='w-full h-full p-2 bg-transparent text-white text-lg'
                    placeholder='입력하세요'
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendMessage();
                      }
                    }}
                  />
                  <button className='send-button' onClick={sendMessage}>
                    <div className='send-button-child'></div>
                    <img className='send-icon' alt='' src={SendIcon} />
                  </button>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default Index;
