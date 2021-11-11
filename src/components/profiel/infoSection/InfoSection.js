import React from 'react';
import './InfoSection.css'

function InfoSection({children, className}) {
    return (
        <section className={className}>
            {children}
        </section>
    );
}

export default InfoSection;