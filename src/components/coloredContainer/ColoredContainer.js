import './ColoredContainer.css';
import React from 'react';
import Button from "../buttons/button/Button";
import FlexItem from "../flexItem/FlexItem";
import Description from "../description/Description";

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
                              onClickButton,
                              linkButton,
                              buttonTypeBottom,
                          }) {

    return (
        <>
            <FlexItem className={classNameItem}>
                <section className={classNameBlock}>

                    {/* If there's a top button: */}
                    {buttonTitleTop &&
                    <Button
                        className={buttonClassNameTop}
                        name={buttonTitleTop}
                        type="button"
                    />}

                    {title &&
                    <h2 className="text-justified">{title}</h2>}
                    {text &&
                    <p className="text-justified">{text}</p>}

                    {children}

                    {/* child property for possible overview container */}
                    {/*{children &&*/}
                    {/*<div className={classNameColumns}>*/}
                    {/*    {children}*/}
                    {/*</div>*/}
                    {/*}*/}

                    {/* If there's a bottom button: */}
                    {buttonTitleBottom &&
                    <Button
                        className={buttonClassNameBottom}
                        onClick={onClickButton}
                        name={buttonTitleBottom}
                        type={buttonTypeBottom}
                        link={linkButton}
                    />}

                </section>
            </FlexItem>
        </>
    );
}

export default ColoredContainer;