import React from 'react'
import './App.css'
import logo from '../../resource/logo.svg'
import SearchBar from '../search-bar/SearchBar'

function App() {
    return (
        <div className="app">
            <div className="app-content">
                <img src={logo} alt='logo' className='app-logo-image' />
                <SearchBar />
            </div>
        </div>
    )
}

export default App
