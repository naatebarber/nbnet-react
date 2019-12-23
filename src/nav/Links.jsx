import React from 'react'
import {
    withRouter
} from 'react-router'

class RouteLinkComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRedirect = () => { 
        this.props.action();
        this.props.history.push(this.props.path) 
    }

    render() {
        return <span className="routeLink" onClick={this.handleRedirect}>{this.props.linkName}</span>
    }
}

class HeadLinkComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    handleRedirect = () => {
        this.props.action();
        this.props.history.push(this.props.path);
    }

    render() {
        return <span className="pageName" onClick={this.handleRedirect}>{this.props.linkName}</span>
    }
}

export let RouteLink = withRouter(RouteLinkComponent);
export let HeadLink = withRouter(HeadLinkComponent);