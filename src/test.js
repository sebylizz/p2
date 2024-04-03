const db = require('./dbload');

const nr = 31;

articles = [];
for(let i = 0; i < nr; i++){articles.push([i])}

function hashmebro(art){
    return art.content.length*art.title.length*art.id % nr;
}

db().then(e => e.forEach(f => articles[hashmebro(f)].push(f.title))).then(r => console.log(articles));