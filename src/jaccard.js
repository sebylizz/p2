const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const SHINGLE_SIZE = 2;

function readFileSync(filePath) {
    return fs.readFileSync(filePath, {encoding: 'utf-8'});
}

function getShingles(text, size) {
    text = text.replace(/\W+/g, ' ').toLowerCase();
    const words = text.split(' ');
    const shingles = new Set();
    for (let i = 0; i <= words.length - size; i++) {
        const shingle = words.slice(i, i + size).join(' ');
        shingles.add(shingle);
    }
    return shingles;
}

function calculateJaccardSimilarity(set1, set2) {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

app.post('/check_similarity', (req, res) => {
    const userText = req.body.text;
    const sourceText = readFileSync('source.txt'); //temp database of a single text
    
    const userShingles = getShingles(userText, SHINGLE_SIZE);
    const sourceShingles = getShingles(sourceText, SHINGLE_SIZE);
    
    const similarity = calculateJaccardSimilarity(userShingles, sourceShingles);
    
    res.json({"similarity": `${(similarity * 100).toFixed(2)}%`});
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
