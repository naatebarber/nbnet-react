import React from 'react'

class Atom extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.animationInterval = null;
        this.state = {
            setupComplete: false
        }
    }

    render() {
        return (
            <canvas 
                ref={this.canvasRef} 
                width={this.props.width + 'px'} 
                height={this.props.height + 'px'} 
                style={{
                    width: this.props.width + 'px', 
                    height: this.props.height + 'px', 
                    marginTop: '14vh',
                    cursor: "pointer"
                }}
            ></canvas>
        )
    }

    componentDidMount() {
        var canvas = this.canvasRef.current,
            cx = canvas.getContext('2d'),
            color = 'blueviolet',
            w = this.props.width,
            h = this.props.height,
            c = w / 2,
            interval = undefined,
            rinit = Math.random() * (2 * Math.PI),
            srxinit = Math.floor(Math.random() * c),
            rotations = [],
            rvectors = [],
            rswitches = [];

        for(var i = 0; i < 3; i++) {
            let sry = c - srxinit;
            if(i % 2 == 0) {
                rvectors.push([srxinit, sry, 0.0001]);
            } else {
                rvectors.push([srxinit, sry, 0.0001]);
            }
            rotations.push(rinit);
            rinit += Math.PI / 3;
            if(srxinit > sry) {
                rswitches.push([true, false]);
            } else {
                rswitches.push([false, true]);
            }
        }
        
        this.animationInterval = setInterval(() => {

            // DPI SCALAGE
            canvas.width = w * 2;
            canvas.height = h * 2;
            canvas.style.width = w;
            canvas.style.height = h;
            cx.scale(2, 2);
            // Drawing
            cx.strokeStyle = color;
            cx.fillStyle = color;
            for(var i in rvectors) {
                cx.beginPath();
                cx.ellipse(c, c, rvectors[i][0], rvectors[i][1], rotations[i], 0, 2 * Math.PI, true);
                cx.stroke();
                // rotations[i] += 0.01;
                rotations[i] += rvectors[i][2];
                if(rswitches[i][0]) {
                    if(rvectors[i][0] < c) {
                        rvectors[i][0] += 0.5;
                    } else {
                        rswitches[i][0] = false;
                    }
                } else {
                    if(rvectors[i][0] > 0) {
                        rvectors[i][0] -= 0.5;
                    } else {
                        rswitches[i][0] = true;
                    }
                }
                if(rswitches[i][1]) {
                    if(rvectors[i][1] < c) {
                        rvectors[i][1] += 0.5;
                    } else {
                        rswitches[i][1] = false;
                    }
                } else {
                    if(rvectors[i][1] > 0) {
                        rvectors[i][1] -= 0.5;
                    } else {
                        rswitches[i][1] = true;
                    }
                }
            }
        }, 16);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval);
    }
}

export default Atom;