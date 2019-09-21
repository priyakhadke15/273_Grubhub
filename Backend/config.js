module.exports = {
    jwtsecret: "",
    sql_host: '',
    sql_port: "",
    sql_user: '',
    sql_password: '',
    sql_database: '',
    initDb: process.env.INITDB === "true"
};