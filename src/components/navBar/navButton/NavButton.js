import React from 'react';

function NavButton({onClick, name}) {
    return (
        <button
        type="button"
        onClick={onClick}
        >
            {name}
        </button>
    );
}

export default NavButton;