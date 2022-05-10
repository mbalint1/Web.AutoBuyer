import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Landing from './components/pages/Landing'
import Login from './components/pages/Login'
import Main from './components/pages/Main'

import './App.css'

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ Landing } />
                    <Route path="/login" component={ Login } />
                    <Route path="/main" component={ Main } />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

const Footer = () => {
    return (
        <p className="text-center" style={ FooterStyle }>Designed & coded by a guy that doesn't know React</p>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}