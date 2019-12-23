import React from 'react'
import {
    RouteLink,
    HeadLink
} from './Links'
import AnimateHeight from 'react-animate-height'
import '../styles/Nav.css'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.routeLinks = [];
        for(let i in this.props.routes) {
            this.routeLinks.push(
                <div key={"routeLink_" + i}>
                    <RouteLink 
                        className="routeLink" 
                        path={i} 
                        linkName={this.props.routes[i]}
                        action={this.closeNavMenu}
                    ></RouteLink>
                    <br></br>
                </div>
            )
        }
        this.state = {
            navHeight: 30
        }
    }

    toggleNavMenu = () => {
        if(this.state.navHeight == "auto") {
            // 
            this.setState(state => { return {navHeight: 30} })
        } else {
            // 
            this.setState(state => { return {navHeight: "auto"} })
        }
    }

    closeNavMenu = () => {
        this.setState(state => { return {navHeight: 30} })
    }

    render() {
        return (
            <div className="nav">
                <AnimateHeight
                    className="nav-bar"
                    duration={200}
                    height={this.state.navHeight}
                >
                    <HeadLink 
                        linkName={this.props.pageName} 
                        path="/"
                        action={this.closeNavMenu}
                    ></HeadLink>
                    {/* <div className="pageName">{this.props.pageName}</div> */}
                    <div className="nav-hamburger" onClick={this.toggleNavMenu}>
                        <div className="nav-patty"></div>
                        <div className="nav-patty"></div>
                        <div className="nav-patty"></div>
                    </div>
                    <div className="nav-menu">
                        {this.routeLinks}
                    </div>
                </AnimateHeight>
            </div>
        )
    }
}

export default Nav;