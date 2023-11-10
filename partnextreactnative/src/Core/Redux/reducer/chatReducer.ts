import { SET_CHAT_DATA,SET_CHAT_LOADING } from "../config/actionTypes";

const initialState = {
    chatData: [],
    loading:false
};

const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CHAT_DATA: {
            return {
                ...state,
                chatData: action.payload,
            };
        }
        case SET_CHAT_LOADING: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default chatReducer;
