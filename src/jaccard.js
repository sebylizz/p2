// Function to create shingles with the size of 2
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
        return ["None found", 0];
    } else {
        return [(maxSimilarity * 100).toFixed(2), mostSimilarArticleIndex];
    }
}

// Calculates Jaccard similarity on two arrays of sentences
function jaccardSentenceSimilarity(inputSentences, articleSentences) {
    const inputShingles = inputSentences.map(s => createShingles(s));
    const articleShingles = articleSentences.map(s => createShingles(s));

    let results = [];

    inputShingles.forEach((set1, idx1) => {
        let maxSimilarity = 0;
        let bestMatchIndex = -1;

        articleShingles.forEach((set2, idx2) => {
            const similarity = calculateJaccard(set1, set2);
            if (similarity > maxSimilarity) {
                maxSimilarity = similarity;
                bestMatchIndex = idx2;
            }
        });

        if (bestMatchIndex !== -1) {
            let formattedSimilarity = (maxSimilarity * 100).toFixed(2);
            results.push([idx1, bestMatchIndex, formattedSimilarity]);
        }
    });

    return results;
}

module.exports = {jaccardSimilarity, jaccardSentenceSimilarity};