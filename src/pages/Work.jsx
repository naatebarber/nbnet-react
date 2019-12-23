import React from 'react'
import Page from '../Page'

import '../styles/Work.css'
import '../styles/animate.css'

class Work extends Page {
    constructor(props) {
        super(props);
        super.pageName = "work";
        this.state = {
            cms: null
        }
        this.workParts = [];
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

        this.state.cms.workPageTextContent.positions.forEach((e, i) => {
            this.workParts.push(
                <div className="workPart animated fadeInUp" key={"workpart_" + i}>
                    <div className="workLocation workPartRow">{e.location}</div>
                    <div className="workDescription workPartRow">
                        <div className="workTitle workPartRow">
                            {e.title} <span className="workTimespan workPartRow">{e.timespan}</span>
                        </div><br></br>
                        {e.description}
                    </div>
                </div>
            );
        });

        return (
            <div className="page">
                <div className="section">
                    <div className="section-title">{this.state.cms.workPageTextContent.title}</div>
                    {this.workParts}
                </div>
            </div>
        )
    }
}

export default Work;