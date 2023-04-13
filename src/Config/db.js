const {host,port,name,database,password,user} = require('../../secrets/db_configuration');
const {Pool} = require('pg');

const pool = new Pool({
    host,
    port,
    name,
    database,
    password,
    user
});

/*
pool.query('select * from monsters', (err, res) => {
    if (err){
        return console.log('Err '+ err);
    }

    console.log(res);
});
*/

module.exports = pool;