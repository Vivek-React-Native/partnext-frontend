import { FEEDBACK_CALL, GET_ALL_SUBSCRIPTION_CALL, GET_PENDING_REQUST_CALL, GET_PROFILE_CALL, GET_SUBSCRIPTION_STATUS_CALL, PURCHASE_SUBSCRIPTION_CALL, UPDATE_PROFILE_CALL } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";


export const getProfileCall = () => {
    return baseApiCall({
        url: GET_PROFILE_CALL,
        method: "get"
    });
};

export const updateProfileCall = (data) => {
    return baseApiCall({
        url: UPDATE_PROFILE_CALL,
        method: "put",
        data
    });
};

export const getAllSubscriptionCall = () => {
    return baseApiCall({
        url: GET_ALL_SUBSCRIPTION_CALL,
        method: "get"
    });
};
export const getSubscriptionStatusCall = () => {
    return baseApiCall({
        url: GET_SUBSCRIPTION_STATUS_CALL,
        method: "get"
    });
};

export const purchaseSubscriptionApiCall = (data) => {
    return baseApiCall({
        url: PURCHASE_SUBSCRIPTION_CALL,
        method: "post",
        data
    });
};

export const getPendingRequstCall = (data) => {
    return baseApiCall({
        url: GET_PENDING_REQUST_CALL,
        method: "post",
        data
    });
};

export const feedbackApiCall = (data) => {
    return baseApiCall({
        url: FEEDBACK_CALL,
        method: "post",
        data
    });
};