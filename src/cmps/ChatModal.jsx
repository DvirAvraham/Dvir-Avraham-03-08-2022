import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMsg } from '../store/actions/userActions';

const ChatModal = ({ currChat }) => {
  const dispatch = useDispatch();
  const [txt, setTxt] = useState('');

  const handleAddMsg = () => {
    dispatch(addMsg(txt));
    setTxt('');
  };

  return (
    <div className="chat">
      <div className="msgs">
        {!!currChat?.msgs?.length &&
          currChat.msgs.map((msg, idx) => {
            return <div key={idx}>{msg.txt}</div>;
          })}
      </div>
      <div className="actions">
        <input
          type="text"
          placeholder="Message..."
          value={txt}
          onChange={(ev) => setTxt(ev.target.value)}
        />
        <button onClick={handleAddMsg}> {'>'} </button>
      </div>
    </div>
  );
};

export default ChatModal;
