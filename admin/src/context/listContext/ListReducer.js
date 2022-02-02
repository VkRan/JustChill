const ListReducer = (state, action) => {
    switch (action.type) {
        case "GET_LIST_START":
            return {
                list: [],
                isFetching: true,
                error: false
            };
        case "GET_LIST_SUCCESS":
            return {
                list: action.payload,
                isFetching: false,
                error: false
            };
        case "GET_LIST_FAILURE":
            return {
                list: null,
                isFetching: false,
                error: true
            };
        case "CREATE_LIST_START":
            return {
                ...state,
                isFetching: true,
                error: false
            };
        case "CREATE_LIST_SUCCESS":
            return {
                list: [...state.movies, action.payload],
                isFetching: false,
                error: false
            };
        case "CREATE_LIST_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            };

        case "DELETE_LIST_START":
            return {
                ...state,
                isFetching: true,
                error: false
            };
        case "DELETE_LIST_SUCCESS":
            return {
                list: state.list.filter((lis) => lis._id !== action.payload ),
                isFetching: false,
                error: false
            };
        case "DELETE_LIST_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return { ...state };
    }
}

export default ListReducer;