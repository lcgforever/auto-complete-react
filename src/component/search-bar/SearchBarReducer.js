import { TYPE_LOAD_SUGGESTIONS } from './SearchBarAction'

const INIT_STATE = {
    suggestions: [],
    hasSuggestions: false
}

export const suggestionReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPE_LOAD_SUGGESTIONS: {
            return {
                suggestions: action.payload,
                hasSuggestions: action.hasSuggestions
            }
        }
        default:
            return state
    }
}
