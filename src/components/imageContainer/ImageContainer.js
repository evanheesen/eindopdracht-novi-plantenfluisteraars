import './ImageContainer.css';
import '../../App.css';
import React from 'react';

function ImageContainer({source, alt, classNameImg}) {
    return (
        <div className="section-item">
        <img
            src={source}
            alt={alt}
            height="400px"
            className={classNameImg}
        />
        </div>
    );
}

export default ImageContainer;