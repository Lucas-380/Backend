const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: `${__dirname}/../../DB/ecommerce.sqlite`
    },
    useNullAsDefault: true
}

module.exports = {
    sqlite3
}