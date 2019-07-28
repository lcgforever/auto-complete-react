import networkApi from '../../network/networkApi'

export const TYPE_LOAD_SUGGESTIONS = 'TYPE_LOAD_SUGGESTIONS'

export const loadSuggestions = (word) => {
    return async dispatch => {
        try {
            const response = await networkApi.get(`/query?word=${word}`)
            dispatch({
                type: TYPE_LOAD_SUGGESTIONS,
                payload: response.data,
                hasSuggestions: response.data.length > 0
            })
        } catch (err) {
            console.log(`Fetch suggestions failed: ${err}`)
            dispatch({
                type: TYPE_LOAD_SUGGESTIONS,
                payload: [],
                hasSuggestions: false
            })
        }
    }
}
