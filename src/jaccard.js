function createShingles(text, size = 2) {
    text = text.replace(/\W+/g, ' ').toLowerCase();
    const words = text.split(' ');
    const shingles = new Set();
    for (let i = 0; i <= words.length - size; i++) {
        shingles.add(words.slice(i, i + size).join(' '));
    }
    return shingles;
}

function calculateJaccard(set1, set2) {
    const intersection = new Set([...set1].filter(shingle => set2.has(shingle)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

function jaccardSimilarity(input, articles) {
    let maxSimilarity = 0;
    let mostSimilarArticleIndex = -1;

    const inputShingles = createShingles(input);

    articles.forEach((article, index) => {
        const articleShingles = createShingles(article.content);
        const similarity = calculateJaccard(inputShingles, articleShingles);

        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            mostSimilarArticleIndex = index;
        }
    });

    if (mostSimilarArticleIndex === -1) { 
        return ["None found", "None found"];
    } else {
        return [(maxSimilarity * 100).toFixed(2) + "%", mostSimilarArticleIndex];
    }
}

module.exports = jaccardSimilarity;
