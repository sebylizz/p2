
// funktion til at sanitize input fjerner tekst som følger "hej" og newline karakterer 

function sanitizeinput(input){
    let sanitize = input.replace(/\r?\n|\r/g, '');
    sanitize = sanitize.replace(/"[^"]*"/g,'');

    return sanitize;
}

module.exports = sanitizeinput;