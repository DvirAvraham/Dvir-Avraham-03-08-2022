import LoginPage from './pages/LoginPage';
import MsgApp from './pages/MsgApp';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { socketService } from './services/socket-service';
import {
  loadLoggedInUser,
  setFriends,
  setChat,
} from './store/actions/userActions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const updateFriends = async ({ msg, friend }) => {
    console.log(msg);
    dispatch(loadLoggedInUser());
    dispatch(setFriends(friend));
  };

  const updateChat = ({ msg, chat }) => {
    console.log(msg);
    dispatch(setChat(null, chat));
  };

  useEffect(() => {
    socketService.off('toggeled-friends');
    socketService.off('load-user');
    socketService.off('msg-notify');
    socketService.on('toggeled-friends', updateFriends);
    socketService.on('load-user', ({ friend }) => {
      dispatch(loadLoggedInUser());
      dispatch(setFriends(friend));
    });
    socketService.on('msg-notify', updateChat);
    return () => {
      socketService.off('toggeled-friends');
      socketService.off('load-user');
      socketService.off('msg-notify');
    };
  }, []);

  return (
    <Routes>
      <Route path="/msg" element={<MsgApp />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
