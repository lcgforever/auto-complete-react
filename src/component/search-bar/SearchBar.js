import React from 'react'
import './SearchBar.css'
import { connect } from 'react-redux'
import { Card, Input, MenuItem, ClickAwayListener } from '@material-ui/core'
import { debounce } from "debounce"
import { loadSuggestions } from './SearchBarAction'

const DEFAULT_ELEVATION = 2
const INCREASED_ELEVATION = 10

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            shouldShowSuggestion: false,
            elevation: DEFAULT_ELEVATION
        }
    }

    render() {
        return (
            <ClickAwayListener onClickAway={() => this.onClickAway()}>
                <Card
                    className='search-bar-root'
                    elevation={this.state.elevation}>
                    <div className='search-bar-card'>
                        <Input
                            inputRef={element => this.inputElement = element}
                            className='search-bar-input'
                            value={this.state.value}
                            onFocus={() => this.onFocus()}
                            onClick={() => this.onFocus()}
                            onChange={e => this.onChange(e)}
                            placeholder='Search'
                            disableUnderline={true}
                            fullWidth={true} />
                    </div>
                    <div hidden={!(this.state.shouldShowSuggestion && this.props.hasSuggestions)} className='search-bar-suggestion-container'>
                        {this.renderMenuItems()}
                    </div>
                </Card>
            </ClickAwayListener>
        )
    }

    onFocus() {
        this.setState({
            elevation: INCREASED_ELEVATION,
            shouldShowSuggestion: true
        })
    }

    onClickAway() {
        this.setState({
            elevation: DEFAULT_ELEVATION,
            shouldShowSuggestion: false
        })
    }

    renderMenuItems() {
        return this.props.suggestions.map((suggestion, index) => {
            return (
                <MenuItem className='search-bar-suggestion' key={index} onClick={(e) => this.onMenuItemClick(e, suggestion)}>{suggestion}</MenuItem>
            )
        })
    }

    onChange(e) {
        let newValue = e.target.value
        this.setState({
            value: newValue
        })
        this.fetchSuggestionsDebounced(this.getLastWord(newValue))
    }

    onMenuItemClick(e, suggestion) {
        this.inputElement.focus()
        let currentValue = this.state.value.trimRight()
        let newValue = `${currentValue} ${suggestion}`
        this.setState({
            value: `${newValue}`
        })
        this.fetchSuggestions(this.getLastWord(newValue))
    }

    getLastWord(value) {
        let valueWithNoTrailingSpace = value.trimRight()
        let word = valueWithNoTrailingSpace.substr(valueWithNoTrailingSpace.lastIndexOf(' ') + 1)
        return word.replace(/\\+/, '')
    }

    fetchSuggestions = word => {
        if (word.length > 0) {
            this.props.loadSuggestions(word)
        }
    }

    fetchSuggestionsDebounced = debounce(this.fetchSuggestions, 300)
}

const mapStateToProps = state => {
    return {
        suggestions: state.suggestionReducer.suggestions,
        hasSuggestions: state.suggestionReducer.hasSuggestions
    }
}

export default connect(
    mapStateToProps,
    { loadSuggestions }
)(SearchBar)
