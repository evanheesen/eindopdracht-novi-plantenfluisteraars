import './ImageContainer.css';
import '../../App.css';
import React from 'react';
import FlexItem from "../flexItem/FlexItem";

function ImageContainer({source, alt, className, classNameImg, source2, alt2, source3, alt3, source4, alt4, children}) {

    return (
        <>
            <FlexItem className={className}>

                {/* if there's only one image */}
                {!source2 &&
                <img
                    src={source}
                    alt={alt}
                    height="400px"
                    className={classNameImg}
                />}

                {children}

                {/* if there should be an image gallery on the left side */}
                {source2 && classNameImg === "image image--left" &&
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

                {/* if there should be an image gallery on the right side */}
                {source2 && classNameImg === "image image--right" &&
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

            </FlexItem>
        </>
    );
}

export default ImageContainer;