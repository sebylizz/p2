function createShingles(text, size = 2) {
    const words = text.toLowerCase().match(/\w+('\w+)?/g) || [];
    const shingles = new Set();
    for (let i = 0; i < words.length - size + 1; i++) {
        shingles.add(words.slice(i, i + size).join(' '));
    }
    return shingles;
}

// The logic for performing Jaccard Comparison
function calculateJaccard(set1, set2) {
    const intersection = new Set([...set1].filter(shingle => set2.has(shingle)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

// Calculates the Jaccard similarity on two string inputs
function jaccardSimilarity(input, articles) {
    let threshold = 0.25;

    const inputShingles = createShingles(input);

    let articleArray = [];

    articles.forEach((article, index) => {
        const articleShingles = createShingles(article.content);
        const similarity = calculateJaccard(inputShingles, articleShingles);

        if (similarity >= threshold) {
            articleArray.push(index)
        }
    });
    return articleArray;
}

// Calculates Jaccard similarity on two arrays of sentences
function jaccardSentenceSimilarity(inputSentences, articleSentencesArray) {
    const inputShingles = inputSentences.map(s => createShingles(s));
    let results = [];

    inputShingles.forEach((inputSet, inputIndex) => {
        let maxSimilarity = -1;
        let bestMatchIndex = -1;
        let bestMatchDocIndex = -1;

        articleSentencesArray.forEach((articleSentences, articleIndex) => {
            const articleShingles = articleSentences.map(s => createShingles(s));
            articleShingles.forEach((articleSet, sentenceIndex) => {
                const similarity = calculateJaccard(inputSet, articleSet);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    bestMatchIndex = sentenceIndex;
                    bestMatchDocIndex = articleIndex;
                }
            });
        });

        if (bestMatchIndex !== -1 && bestMatchDocIndex !== -1) {
            let formattedSimilarity = parseFloat((maxSimilarity * 100).toFixed(2));
            results.push([inputIndex, bestMatchIndex, formattedSimilarity, bestMatchDocIndex]);
        }
    });

    return results;
}

module.exports = {jaccardSimilarity, jaccardSentenceSimilarity};