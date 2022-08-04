import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMsg } from '../store/actions/userActions';

const ChatModal = ({ setIsChatOpen, currChat }) => {
  const dispatch = useDispatch();
  const [txt, setTxt] = useState('');

  const handleAddMsg = () => {
    dispatch(addMsg(txt));
    setTxt('');
  };

  return (
    <div>
      <div>
        {currChat?.msgs?.length &&
          currChat.msgs.map((msg, idx) => {
            return <div key={idx}>{msg.txt}</div>;
          })}
      </div>
      <input
        type="text"
        placeholder="ze ze"
        value={txt}
        onChange={(ev) => setTxt(ev.target.value)}
      />
      <button onClick={handleAddMsg}>Send msg</button>
      <button onClick={() => setIsChatOpen(false)}>Close</button>
    </div>
  );
};

export default ChatModal;
