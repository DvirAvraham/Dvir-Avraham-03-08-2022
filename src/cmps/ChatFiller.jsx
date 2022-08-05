import msg from '../assets/imgs/msg.png';

const ChatFiller = ({ txt, isFriendsList }) => {
  return (
    <div className="chat-filler flex column align-center justify-center">
      <div>
        <img src={msg} alt="" />
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
