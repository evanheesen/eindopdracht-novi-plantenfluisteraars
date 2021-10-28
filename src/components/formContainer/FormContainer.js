import React from 'react';
import './FormContainer.css';
import Button from "../button/Button";

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
                           buttonRegister,
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
                        <Button
                            className={buttonClassName}
                            onClick={onClickButton}
                            name={buttonTitle}
                            type="submit"
                            value={buttonValue}
                            // registreren={buttonRegister}
                        />}
                    </fieldset>
                </form>

            </div>
        </div>
    );
}

export default FormContainer;