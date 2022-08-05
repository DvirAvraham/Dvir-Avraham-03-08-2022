import msg from '../assets/imgs/msg.png';

const ChatFiller = () => {
  return (
    <div className="chat-filler flex column align-center justify-center">
      <div>
        <img src={msg} alt="" />
      </div>
      <div className="title">Your Messages</div>
      <div className="desc">
        Send private photos and messages to a friend or group.
      </div>
      <button className="info">
        Click on a friend to start a conversation
      </button>
    </div>
  );
};

export default ChatFiller;
