import './ColoredContainer.css';
import React from 'react';
import Button from "../button/Button";
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
        // <div className={classNameItem}>
        <>
            <FlexItem
                className={classNameItem}
            >
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

                    {children}

                    {/* child property for possible overview container */}
                    {/*{children &&*/}
                    {/*<div className={classNameColumns}>*/}
                    {/*    {children}*/}
                    {/*</div>*/}
                    {/*}*/}

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
        // </div>
    );
}

export default ColoredContainer;