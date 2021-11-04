let customers = [
    {
        id: 1,
        name: 'Klantnaam 1',
        location: 'Plaats 1',
        street: 'Straat 1',
        number: 'Nummer 1',
        zipCode: 'Postcode1',
        email: 'Email@email.nl',
        phone: '0000000001',
        contactName: 'Contact naam 1',
        contactMail: 'Email@email.nl',
        contactPhone: '0011111111',
        bankAccount: 'AA00OOOO0000000001',
        vatNumber: 'AA000000001',
        cocNumber: '00000001',
    },
    {
        id: 2,
        name: 'Klantnaam 2',
        location: 'Plaats 2',
        street: 'Straat 2',
        number: 'Nummer 2',
        zipCode: 'Postcode2',
        email: 'Email@email.nl',
        phone: '0000000002',
        contactName: 'Contact naam 2',
        contactMail: 'Email@email.nl',
        contactPhone: '0022222222',
        bankAccount: 'AA00OOOO0000000002',
        vatNumber: 'AA000000002',
        cocNumber: '00000002',
    },
    {
        id: 3,
        name: 'Klantnaam 3',
        location: 'Plaats 3',
        street: 'Straat 3',
        number: 'Nummer 3',
        zipCode: 'Postcode3',
        email: 'Email@email.nl',
        phone: '0000000003',
        contactName: 'Contact naam 3',
        contactMail: 'Email@email.nl',
        contactPhone: '0033333333',
        bankAccount: 'AA00OOOO0000000003',
        vatNumber: 'AA000000003',
        cocNumber: '00000003',
    },
    {
        id: 4,
        name: 'Klantnaam 4',
        location: 'Plaats 4',
        street: 'Straat 4',
        number: 'Nummer 4',
        zipCode: 'Postcode4',
        email: 'Email@email.nl',
        phone: '0000000004',
        contactName: 'Contact naam 4',
        contactMail: 'Email@email.nl',
        contactPhone: '0044444444',
        bankAccount: 'AA00OOOO0000000004',
        vatNumber: 'AA000000004',
        cocNumber: '00000004',
    },
    {
        id: 5,
        name: 'Klantnaam 5',
        location: 'Plaats 5',
        street: 'Straat 5',
        number: 'Nummer 5',
        zipCode: 'Postcode5',
        email: 'Email@email.nl',
        phone: '0000000005',
        contactName: 'Contact naam 5',
        contactMail: 'Email@email.nl',
        contactPhone: '00555555555',
        bankAccount: 'AA00OOOO0000000005',
        vatNumber: 'AA000000005',
        cocNumber: '00000005',
    },
    {
        id: 6,
        name: 'Klantnaam 6',
        location: 'Plaats 6',
        street: 'Straat 6',
        number: 'Nummer 6',
        zipCode: 'Postcode6',
        email: 'Email@email.nl',
        phone: '0000000006',
        contactName: 'Contact naam 6',
        contactMail: 'Email@email.nl',
        contactPhone: '0066666666',
        bankAccount: 'AA00OOOO0000000006',
        vatNumber: 'AA000000006',
        cocNumber: '00000006',
    },
    {
        id: 7,
        name: 'Klantnaam 7',
        location: 'Plaats 7',
        street: 'Straat 7',
        number: 'Nummer 7',
        zipCode: 'Postcode7',
        email: 'Email@email.nl',
        phone: '0000000007',
        contactName: 'Contact naam 7',
        contactMail: 'Email@email.nl',
        contactPhone: '0077777777',
        bankAccount: 'AA00OOOO0000000007',
        vatNumber: 'AA000000007',
        cocNumber: '00000007',
    },
    {
        id: 8,
        name: 'Klantnaam 8',
        location: 'Plaats 8',
        street: 'Straat 8',
        number: 'Nummer 8',
        zipCode: 'Postcode8',
        email: 'Email@email.nl',
        phone: '0000000008',
        contactName: 'Contact naam 8',
        contactMail: 'Email@email.nl',
        contactPhone: '0088888888',
        bankAccount: 'AA00OOOO0000000008',
        vatNumber: 'AA000000008',
        cocNumber: '00000008',
    },
]

let latestId = 8

export const customersAPI = {

    get: (id) => {
        return customers.find(x => x.id === id);
    },

    list: () => {
        return customers
    },


    create: (payload) => {
        payload.id = latestId + 1
        latestId++
        customers.push(payload)
        return payload
    },

    update: (id, payload) => {
        const index = customers.findIndex(x => x.id === id)
        customers[index] = payload
        return customers[index]
    },

    delete: (id) => {
        customers = customers.filter(x => x.id !== id)
        return {}
    }
}