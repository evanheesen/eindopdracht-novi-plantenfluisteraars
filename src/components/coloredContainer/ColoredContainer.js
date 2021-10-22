import './ColoredContainer.css';
// import '../../App.css';
import React from 'react';
import Button from "../button/Button";

function ColoredContainer({
                              children,
                              classNameItem,
                              classNameBlock,
                              title,
                              text,
                              classNameColumns,
                              buttonClassNameTop,
                              buttonTitleTop,
                              buttonClassNameBottom,
                              buttonTitleBottom,
                              buttonLinkBottom,
                          }) {

    return (
        <div className={classNameItem}>
            <section className={classNameBlock}>
                {buttonTitleTop &&
                <Button
                    className={buttonClassNameTop}
                    name={buttonTitleTop}
                    type="button"
                />}

                {title &&
                <h2 className="text-justified">{title}</h2>
                }
                {text &&
                <p className="text-justified">{text}</p>
                }

                {/* child property for possible overview container */}
                {children &&
                <div className={classNameColumns}>
                    {children}
                </div>
                }

                {buttonTitleBottom &&
                <Button
                    className={buttonClassNameBottom}
                    link={buttonLinkBottom}
                    name={buttonTitleBottom}
                    type="button"
                />}
            </section>
        </div>
    );
}

export default ColoredContainer;