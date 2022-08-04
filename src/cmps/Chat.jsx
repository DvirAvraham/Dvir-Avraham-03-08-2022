import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMsg } from '../store/actions/userActions';

const Chat = ({ currChat }) => {
  const dispatch = useDispatch();
  const [txt, setTxt] = useState('');

  const handleAddMsg = () => {
    dispatch(addMsg(txt));
    setTxt('');
  };

  return (
    <div className="chat flex column">
      <div className="msgs flex column grow-1">
        {!!currChat?.msgs?.length &&
          currChat.msgs.map((msg, idx) => {
            return <div key={idx}>{msg.txt}</div>;
          })}
      </div>
      <div className="actions flex">
        <input
          type="text"
          placeholder="Message..."
          value={txt}
          onChange={(ev) => setTxt(ev.target.value)}
        />
        {/* <button onClick={handleAddMsg}> {'>'} </button> */}
      </div>
    </div>
  );
};

export default Chat;
