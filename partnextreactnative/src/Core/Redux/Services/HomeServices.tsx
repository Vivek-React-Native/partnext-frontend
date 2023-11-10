import { GET_FRIEND_SUGGESTION_CALL, GET_USER_PROFILE_CALL, UPDATE_LEFT_RIGHT_CALL } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";


export const getFriendSuggestionCall = (data) => {
    return baseApiCall({
        url: GET_FRIEND_SUGGESTION_CALL,
        method: "post",
        data
    });
};
export const getUserProfileCall = (data) => {
    return baseApiCall({
        url: GET_USER_PROFILE_CALL + data,
        method: "get"
    });
};
export const addLeftRightCall = (data) => {
    return baseApiCall({
        url: UPDATE_LEFT_RIGHT_CALL,
        method: "post",
        data
    });
};