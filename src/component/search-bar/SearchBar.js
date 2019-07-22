import React from 'react'
import './SearchBar.css'
import Autosuggest from 'react-autosuggest';

const TEST_DATA = [
    { name: 'Word1' },
    { name: 'Word2' },
    { name: 'Word3' },
]

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
            onChange: this.onChange
        };
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
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: TEST_DATA
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <p className='search-bar-suggestion-container'>{suggestion.name}</p>
        )
    }
}

export default SearchBar
