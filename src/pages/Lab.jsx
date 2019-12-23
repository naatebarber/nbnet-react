import React from 'react'
import Page from '../Page'

import '../styles/Root.css'
import '../styles/animate.css'

class Lab extends Page {
    constructor(props) {
        super(props);
        super.pageName = "lab";
        this.state = {
            cms: null
        }
        this.lab = [];
    }

    componentDidMount() {
        super.getCMS().then(res => {
            this.setState({
                cms: res.fields
            });
        })
    }

    render() {
        if(this.state.cms == null) return <div></div>

        this.state.cms.labEntries.lab.forEach((e, i) => {
            this.lab.push(
                <div className="text animated fadeInUp" key={"labItem_" + i}>
                    <h3>{e.title}</h3>
                    <p>{e.body}</p>
                </div>
            )
        });

        return (
            <div className="page">
                <div className="section">
                    <div className="section-title">Lab</div>
                    {this.lab}
                </div>
            </div>
        )
    }
}

export default Lab;