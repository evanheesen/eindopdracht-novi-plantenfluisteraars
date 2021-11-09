import React from 'react';
import './InfoSection.css'

function InfoSection({children}) {
    return (
        <section className="InfoSection">
            {children}
        </section>
    );
}

export default InfoSection;