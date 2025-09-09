module.exports = {
    HOST: 'mysql.railway.internal',
    USER: 'root',
    PASSWORD: 'NOlVkziioaPdQmJkFFNdKUtQSMxVYwMm',
    DB: 'railway',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
