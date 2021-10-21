import './ImageContainer.css';
import '../../App.css';
import React from 'react';

function ImageContainer({source, alt, classNameImg, source2, alt2, source3, alt3, source4, alt4}) {

    return (
        <div className="section-item">

            {/* als er slechts 1 afbeelding is */}
            {!source2 &&
            <img
                src={source}
                alt={alt}
                height="400px"
                className={classNameImg}
            />}

            {/* als er image gallery moet komen aan de linkerkant */}
            {source2 && classNameImg==="image image--left" &&
            <div className={classNameImg}>
                <div className="image image--gallery">
                    <img
                        src={source}
                        alt={alt}
                    />
                    <img
                        src={source2}
                        alt={alt2}
                    />
                    <img
                        src={source3}
                        alt={alt3}
                        className="image-gallery-top-right"
                    />
                    <img
                        src={source4}
                        alt={alt4}
                        className="image-gallery-bottom-right"
                    />
                </div>
            </div>
            }

            {/* als er image gallery moet komen aan de rechterkant */}
            {source2 && classNameImg==="image image--right" &&
            <div className={classNameImg}>
                <div className="image image--gallery">
                    <img
                        src={source}
                        alt={alt}
                        className="image-gallery-top-left"
                    />
                    <img
                        src={source2}
                        alt={alt2}
                        className="image-gallery-bottom-left"
                    />
                    <img
                        src={source3}
                        alt={alt3}
                    />
                    <img
                        src={source4}
                        alt={alt4}
                    />
                </div>
            </div>
            }

        </div>
    );
}

export default ImageContainer;