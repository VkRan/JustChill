export const getListStart = () => ({
    type: "GET_LIST_START"
});

export const getListSuccess = (list) => ({
    type: "GET_LIST_SUCCESS",
    payload: list
});

export const getListFailure = () => ({
    type: "GET_LIST_FAILURE"
});

export const createListStart = () => ({
    type: "CREATE_LIST_START"
});

export const createListSuccess = (list) => ({
    type: "CREATE_LIST_SUCCESS",
    payload: list
});

export const createListFailure = () => ({
    type: "CREATE_LIST_FAIL"
});

export const updateListStart = () => ({
    type: "UPDATE_LIST_START"
});

export const updateListSuccess = (list) => ({
    type: "UPDATE_LIST_SUCCESS",
    payload: list
});

export const updateListFailure = () => ({
    type: "UPDATE_LIST_FAILURE"
});

export const deleteListStart = () => ({
    type: "DELETE_LIST_START"
});

export const deleteListSuccess = (id) => ({
    type: "DELETE_LIST_SUCCESS",
    payload: id
});

export const deleteListFailure = () => ({
    type: "DELETE_LIST_FAILURE"
});