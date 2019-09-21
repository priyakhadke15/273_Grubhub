const mysql = require('mysql');
// const faker = require('faker');
const { sql_host, sql_port, sql_user, sql_password, sql_database } = require('../config');

const { createTables } = require('./init');
const { getPersons, savePerson } = require('./persons');
const { getItems, saveItem } = require('./items');
const { getRestaurants, saveRestaurant } = require('./restaurants');

const pool = mysql.createPool({
    host: sql_host,
    port: sql_port,
    user: sql_user,
    password: sql_password,
    database: sql_database,
    multipleStatements: true
});

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            console.log()
            return err ? reject(err) : resolve(connection);
        });
    });
};

const _createTables = async () => {
    const conn = await getConnection();
    return createTables(conn);
};

const _getPersons = async whereClause => {
    const conn = await getConnection();
    return getPersons(conn)(whereClause);
};

const _savePerson = async person => {
    const conn = await getConnection();
    return savePerson(conn)(person);
};

const _getItems = async id => {
    const conn = await getConnection();
    return getItems(conn)(id);
};

const _saveItem = async item => {
    const conn = await getConnection();
    return saveItem(conn)(item);
};

const _getRestaurants = async id => {
    const conn = await getConnection();
    return getRestaurants(conn)(id);
};

const _saveRestaurant = async restaurant => {
    const conn = await getConnection();
    return saveRestaurant(conn)(restaurant);
};

module.exports = {
    createTables: _createTables,
    getPersons: _getPersons,
    savePerson: _savePerson,
    getItems: _getItems,
    saveItem: _saveItem,
    getRestaurants: _getRestaurants,
    saveRestaurant: _saveRestaurant
};