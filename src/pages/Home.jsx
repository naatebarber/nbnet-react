import React from 'react'
import Page from '../Page'
import Atom from '../custom/Atom'
import ImageGrid from '../custom/ImageGrid'

import AnimateHeight from 'react-animate-height'

import '../styles/Home.css'
import chevron from '../styles/img/chevron.png'

class Home extends Page {
    constructor(props) {
        super(props);
        super.pageName = "home";
        this.sectionSecondRef = React.createRef();
        this.state = {
            cms: null
        }   
        this.images = [];
        this.basicText = [];
        this.qa = [];
    }

    componentDidMount() {
        super.getCMS().then(res => {
            this.setState({
                cms: res.fields,
                atomComponentHeight: 0
            })
        });
    }

    render() {
        if(this.state.cms == null) return <div></div>

        this.state.cms.imageGrid.forEach((e, i) => {
            this.images.push(e.fields.file.url);
            // this.state.cms.imageGrid[i] = e.fields.file.url;
        });

        this.state.cms.homePageTextContent.basic.forEach((e, i) => {
            this.basicText.push(
                <div className="text" key={"basic_" + i}>
                    <h3>{e.header}</h3>
                    <p>{e.body}</p>
                </div>
            );
        });

        this.state.cms.homePageTextContent.extra.qa.forEach((e, i) => {
            if(!e.hasOwnProperty("code")) {
                this.qa.push(
                    <div className="text" key={"qa_" + i}>
                        <p><strong>{e.question}</strong><br></br>{e.answer}</p>
                    </div>
                );
            } else {
                this.qa.push(
                    <div className="text" key={"qa_" + i}>
                        <p><strong>{e.question}</strong><br></br>{e.answer}<code>{e.code}</code></p>
                    </div>
                );
            }
        });

        return (
            <div className="page">
                <div className="section accent1">
                    <div
                        className="animated fadeInDown"
                        onClick={() => {
                            let tempState = this.state;
                            if(tempState.atomComponentHeight == 0) {
                                tempState.atomComponentHeight = 300;
                            } else {
                                tempState.atomComponentHeight = 0;                                
                            }
                            this.setState(tempState);
                        }}
                    ><Atom width={300} height={300}></Atom></div>
                    <AnimateHeight
                        className="atom-component"
                        duration={500}
                        height={this.state.atomComponentHeight}
                    >
                        <div className="text" style={{textAlign: "left"}}>
                            <code>{this.state.cms.atomComponentCode.atomComponent}</code>
                        </div>
                    </AnimateHeight>
                    <div className="phrase-wrap">
                        <span className="phrase">{this.state.cms.tagline}</span>
                        <br></br>
                        <img 
                            src={chevron} 
                            className="down-arrow"
                            onClick={() => {
                                super.scroll(this.sectionSecondRef)
                            }}
                        ></img>
                    </div>
                </div>
                <div className="section accent1" id="section-second">
                    <ImageGrid imageRefs={this.images}></ImageGrid>
                    <div id="textMarker" ref={this.sectionSecondRef}></div>
                    {this.basicText}
                    <div className="text"><h3>Q & A</h3></div>
                    {this.qa}
                </div>
            </div>
        )
    }
}

export default Home;