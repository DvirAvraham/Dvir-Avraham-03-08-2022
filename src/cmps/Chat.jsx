import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMsg } from '../store/actions/userActions';
import { FiSend } from 'react-icons/fi';

const Chat = ({ currChat, loggedInUserId }) => {
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
            return (
              <div
                className={`msg ${
                  msg.createdBy === loggedInUserId ? 'my' : ''
                }`}
                key={idx}
              >
                {msg.txt}
              </div>
            );
          })}
      </div>
      <div className="actions flex">
        <input
          type="text"
          placeholder="Message..."
          value={txt}
          onChange={(ev) => setTxt(ev.target.value)}
        />
        <button
          disabled={!txt}
          className="send flex justify-center align-center"
          onClick={handleAddMsg}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
