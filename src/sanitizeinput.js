
// funktion til at sanitize input fjerner tekst som følger "hej" og newline karakterer 

function sanitizeinput(input){
    let sanitize = input.replace(/\r?\n|\r/g, ' '); // newline
    sanitize = sanitize.replace(/"[^"]*"/g,''); // "hej"
    sanitize = sanitize.replace(/\[[^\]]*\]/g, ''); // [hej]
    sanitize = sanitize.replace(/\([^)]*\)/g, ''); // (hej)

    return sanitize;
}

module.exports = sanitizeinput;