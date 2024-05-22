const sql = require('sqlite3');
const path = require('path');

const db = new sql.Database(path.join(__dirname + '/articles.db'));

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
            db.close();
        });
    });
}

module.exports = load;