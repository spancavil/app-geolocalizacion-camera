import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('address.db')

export const init = () => {
    const promise = new Promise ((accept, reject) => {
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)'),
            [],
            () => { accept()},
            (_, err) => { reject(err)}
        })
    })

    return promise;
}

export const insertAddress = async (
    address,
    lat,
    lng
) => {
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=> {
            tx.executeSql(
                'INSERT INTO address (address, lat, lng) VALUES (?, ?, ?);',
                [address, lat, lng],
                (_, result) => resolve(result),
                (_, error) => reject(error),
            )
        })
    } )
    return promise
}

export const fetchAddresses = async () => {
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=> {
            tx.executeSql(
                'SELECT * from address;',
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error),
            )
        })
    } )
    return promise
}