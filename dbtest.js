const cosinus = require('./src/cosine');
const sql = require('sqlite3');

const db = new sql.Database('./src/articles.db');

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

async function main(){
    const articles = await load();
    console.log(cosinus("Israel Palestine Hitler bad guys knows", articles));
}

main();