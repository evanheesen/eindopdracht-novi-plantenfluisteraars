import React from 'react';

function ItemContent({ title, date, address, phone, plants, customer, email, enabled, children}) {
    return (
        <>
            <h4>{title}</h4>
            {date &&
            <p><strong>Datum aanvraag: </strong>{date}</p>}
            {address &&
            <p><strong>Adres: </strong>{address}</p>}
            {customer &&
            <p><strong>Bewoner: </strong>{customer}</p>}
            {phone &&
            <p><strong>Telefoonnummer: </strong>{phone}</p>}
            {plants &&
            <p><strong>Pakket beplanting: </strong>{plants}</p>}
            {email &&
            <p><strong>Email: </strong>{email}</p>}
            {enabled &&
            <p><strong>Actief: </strong>{enabled}</p>}
            {children}
        </>
    );
}

export default ItemContent;