import React from 'react'
import '../styles/ImageGrid.css'

class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
        this.images = [];

        for(let i in props.imageRefs) {
            this.images.push(
                <div 
                    className="imageWrapper" 
                    key={"image" + i}
                >
                    <img src={props.imageRefs[i]} className="image"></img>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="imageGrid">
                {this.images}
            </div>
        )
    }
}

export default ImageGrid