const fs = require('fs');

async function sanitize(article) {
    try {
        const response = await fetch(article, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "da-DK,da;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "gnt_eid=(null); gnt_i=46449142335353058286*1835*DK~81; OptanonAlertBoxClosed=2024-03-07T10:35:43.960Z; eupubconsent-v2=CP7GZZgP7GZZgAcABBENAqE8AP_gAEPgACiQg1QGAAFAAVAAyABwAEAAKgAZAA0AB0AEmAJgAmgBbADCAJQAhACNQF5gMZAm9BOAE5IJzAnVBOwE84J6gn0EGoQaoCwACgAKgAcABAADIAGgAOAAmABbAIQARYBecE3gTfAnDBOUE5gJ0gTrgnaCdwE8AJ5gT7CDUAAA.f_wACHwAAAAA; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Mar+07+2024+11%3A43%3A29+GMT%2B0100+(Centraleurop%C3%A6isk+normaltid)&version=202401.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=43d69a36-f01c-47d4-a319-fb7af3c8273c&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C3%3A1%2C2%3A1%2C4%3A1%2C5%3A1%2CBG250%3A1%2CV2STACK42%3A1&genVendors=V12%3A1%2CV8%3A1%2CV10%3A1%2CV9%3A1%2CV7%3A1%2CV1%3A1%2C&geolocation=DK%3B81&AwaitingReconsent=false",
                "Referer": "https://eu.usatoday.com/story/news/politics/2024/03/06/biden-cease-fire-gaza-state-of-the-union/72840302007/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });

        const rawHtml = await response.text();

        const title = getTitle(rawHtml);

        const content = getParagraphs(rawHtml);

        const result = title+content;

        return result;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function getTitle(html){
    let title = html.match(/(?<=<title>=?).+?(?=<\/title>)/g);
    return title;
}

function getParagraphs(html) {
    let content = html.match(/(?<=<p>).+?(?=<\/p>)/g);
    content = content.map(e => e = e.replace(/<[^>]+>/g, ''));
    let result = "";
    content.forEach(e => result += "\n"+e);
    if(content === null){
        return "Couldn't retrieve article";
    }
    return result;
}

if(process.argv.length == 3){
    sanitize(process.argv[2]).then((result) => {
        fs.writeFile("./out.txt", result, function(err) {
            if(err){
                return console.log(err);
            }
            console.log("saved in out.txt");
        });
    });
}
else{
    console.log("Usage: node sanitizearticle.js articlelink");
}

