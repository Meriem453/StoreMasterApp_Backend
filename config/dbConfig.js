module.exports = {
    DB: 'mysql://root:NOlVkziioaPdQmJkFFNdKUtQSMxVYwMm@maglev.proxy.rlwy.net:42941/railway',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
