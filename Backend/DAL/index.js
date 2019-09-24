const mysql = require('mysql');
// const faker = require('faker');
const { sql_host, sql_port, sql_user, sql_password, sql_database } = require('../config');

const { createTables } = require('./init');
const { getPersons, savePerson, editPerson } = require('./persons');
const { getItems, saveItem, editItem } = require('./items');
const { getRestaurants, saveRestaurant, editRestaurant } = require('./restaurants');

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

const _editPerson = async person => {
    const conn = await getConnection();
    return editPerson(conn)(person);
};


const _getItems = async id => {
    const conn = await getConnection();
    return getItems(conn)(id);
};

const _saveItem = async item => {
    const conn = await getConnection();
    return saveItem(conn)(item);
};

const _editItem = async item => {
    const conn = await getConnection();
    return editItem(conn)(item);
};

const _getRestaurants = async id => {
    const conn = await getConnection();
    return getRestaurants(conn)(id);
};

const _saveRestaurant = async restaurant => {
    const conn = await getConnection();
    return saveRestaurant(conn)(restaurant);
};
const _editRestaurant = async restaurant => {
    const conn = await getConnection();
    return editRestaurant(conn)(restaurant);
};

module.exports = {
    createTables: _createTables,
    getPersons: _getPersons,
    savePerson: _savePerson,
    editPerson: _editPerson,
    getItems: _getItems,
    saveItem: _saveItem,
    editItem: _editItem,
    getRestaurants: _getRestaurants,
    saveRestaurant: _saveRestaurant,
    editRestaurant: _editRestaurant

};