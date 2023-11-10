import { SET_CHAT_DATA, SET_CHAT_LOADING } from '../config/actionTypes';
import { getChatListCall } from '../Services/ChatServices';

export const SetChatAction = () => {
  const data = {
    start: 0,
    length: 40,
  };
  return (dispatch: any) => {
    dispatch({ type: SET_CHAT_LOADING, payload: true });
    getChatListCall(data)
      .then((res: any) => {
        // console.log("dispatch===>", res.data.data)
        dispatch(setChatDataCall(res.data.data));
      })
      .catch(err => {
        dispatch({ type: SET_CHAT_LOADING, payload: false });
      });
  };
};

export const setChatDataCall = (payload: any) => {
  return (dispatch: any) => {
    dispatch({ type: SET_CHAT_DATA, payload: payload });
    dispatch({ type: SET_CHAT_LOADING, payload: false });
  };
};
