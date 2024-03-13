const sql = require('sqlite3');

const db = new sql.Database('./articles.db');

function load(){
    return new Promise((resolve, reject) => {
        let arr = [];
        db.each("SELECT * FROM articles", (err, row) => {
            if(err){
                console.log(err);
                reject(err);
                return;
            }
            arr.push(row);
        }, () => {
            resolve(arr);
        });
    });
}

module.exports = load;