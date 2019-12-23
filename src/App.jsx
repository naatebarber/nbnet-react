import React from 'react'
import ReactDOM from 'react-dom'
import {
    Router,
    Switch,
    Route
} from 'react-router'
import { createBrowserHistory } from 'history'

import Nav from './nav/Nav'
import Home from './pages/Home'
import Work from './pages/Work'
import Lab from './pages/Lab'

const routes = {
        "app": {
            "/": Home,
            "/work": Work,
            "/lab": Lab
        },
        "nav": {
            "/": "Home",
            "/work": "Work",
            "/lab": "Lab"
        }
    },
    customHistory = createBrowserHistory();

class RoutedApplication extends React.Component {
    constructor(props) {
        super(props);
        this.appRoutes = [];
        for(let i in routes) {
            this.appRoutes.push(
                <Route exact path={i} component={Home} key={"routeElement_" + i.substring(1)}/>
            )
        }
    }

    render() {
        return (
            <div id="routedApplication">
                <Router history={customHistory}>
                    <Nav routes={routes.nav} pageName="nathanbarber"></Nav>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route exact path='/work' component={Work}></Route>
                        <Route exact path='/lab' component={Lab}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(
    <RoutedApplication></RoutedApplication>,
    document.getElementById("react-app")
)

module.hot.accept()