import React from 'react'
import Axios from 'axios'
import './SearchBar.css'
import Autosuggest from 'react-autosuggest'

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            suggestions: []
        }
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
            placeholder: "Search",
            value,
            onChange: this.onChange,
            onKeyUp: this.onKeyUp
        }
        return (
            <div className='search-bar-root'>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}>
                    <div className='search-bar-foot'></div>
                </Autosuggest>
            </div>
        )
    }

    onChange = (event, { newValue, method }) => {
        console.log('onChanged: ' + newValue)
        this.setState({
            value: newValue
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.endsWith(' ')) {
            Axios.get(`http://localhost:8080/api/query?word=${value}`)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        this.setState({
                            suggestions: res.data.map(data => data.following_word)
                        })
                    } else {
                        this.setState({
                            suggestions: []
                        })
                    }
                })
                .catch(err => {
                    console.log('Request err: ' + err)
                })
        }
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    getSuggestionValue(suggestion) {
        return suggestion
    }

    renderSuggestion(suggestion) {
        return (
            <p className='search-bar-suggestion-container'>{suggestion}</p>
        )
    }
}

export default SearchBar
