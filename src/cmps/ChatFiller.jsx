import msg from '../assets/imgs/msg.png';
import darkMsg from '../assets/imgs/darkMsg.png';

const ChatFiller = ({ txt, isFriendsList, isDark }) => {
  return (
    <div className="chat-filler flex column align-center justify-center">
      <div>
        <img src={isDark ? darkMsg : msg} alt="" className="send-msg-icon" />
      </div>
      <div className="title">Your Messages</div>
      <div className="desc">{txt}</div>
      <button className={`info ${isFriendsList ? '' : 'transparent'}`}>
        Click on a friend to start a conversation
      </button>
    </div>
  );
};

export default ChatFiller;
