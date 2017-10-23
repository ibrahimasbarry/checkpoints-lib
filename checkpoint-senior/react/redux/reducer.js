import { MESSAGES_RECEIVED, MESSAGES_LOADING, NEW_MESSAGE } from './constants';

const initialState = {
    messagesLoading: false,
    messages: []
};

export default (state = initialState, action) => {

    const newState = Object.assign({}, state);

    switch (action.type) {
        case MESSAGES_LOADING:
            newState.messagesLoading = true;
            return newState;
        case MESSAGES_RECEIVED:
            newState.messages = action.messages;
            return newState;
        case NEW_MESSAGE:
            newState.messages = [...state.messages, action.message];
            return newState;
        default:
            return state;
    }

};
