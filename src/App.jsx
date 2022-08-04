import LoginPage from './pages/LoginPage';
import MsgApp from './pages/MsgApp';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { socketService } from './services/socket-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  loadLoggedInUser,
  setFriends,
  setChat,
} from './store/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const { errorMsg } = useSelector((state) => state.userModule);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errorMsg]);

  const updateFriends = async ({ msg, friend }) => {
    toast.info(msg, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(loadLoggedInUser());
    dispatch(setFriends(friend));
  };

  const updateChat = ({ msg, chat }) => {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    <>
      <Routes>
        <Route path="/msg" element={<MsgApp />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
