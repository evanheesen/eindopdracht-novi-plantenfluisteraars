import React from 'react';
import './FormContainer.css';
import Button from "../buttons/button/Button";

// CSS can be found in ColoredContainer.CSS

function FormContainer({
                           children,
                           classNameItem,
                           classNameBlock,
                           classNameContainer,
                           onSubmit,
                           title,
                           text,
                           buttonClassName,
                           buttonTitle,
                           buttonValue,
                           onClickButton,
                       }) {


    return (
        <div className={classNameItem}>

            <div className={classNameBlock}>
                <form onSubmit={onSubmit}>

                    {title &&
                    <h2 className="text-justified">{title}</h2>}
                    {text &&
                    <p className="text-justified">{text}</p>
                    }

                    <fieldset className={classNameContainer}>
                        {children}

                        {buttonTitle &&
                        <button
                            className={buttonClassName}
                            onClick={onClickButton}
                            type="submit"
                        >
                            {buttonTitle}
                        </button>}
                    </fieldset>
                </form>

            </div>
        </div>
    );
}

export default FormContainer;