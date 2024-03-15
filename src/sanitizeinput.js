function sanitizeinput(input){
    let sanitize = input.replace(/\r?\n|\r/g, '');
    sanitize = sanitize.replace(/"[^"]*"/g,'');

    return sanitize;
}

module.exports = sanitizeinput;