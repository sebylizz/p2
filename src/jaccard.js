function createShingles(text, size = 2) {
    const words = text.toLowerCase().match(/\w+('\w+)?/g) || [];
    const shingles = new Set();
    for (let i = 0; i < words.length - size + 1; i++) {
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
        return ["None found", 0];
    } else {
        return [(maxSimilarity * 100).toFixed(2) + "%", mostSimilarArticleIndex];
    }
}

function jaccardSentenceSimilarity(inputSentences, articleSentences) {
    const inputShingles = inputSentences.map(s => createShingles(s));
    const articleShingles = articleSentences.map(s => createShingles(s));

    let similarPairs = [];
    let totalSimilarity = 0;
    let countSimilar = 0;

    inputShingles.forEach((set1, idx1) => {
        articleShingles.forEach((set2, idx2) => {
            const similarity = calculateJaccard(set1, set2);
            if (similarity >= 0.5) {
                let formattedSimilarity = (similarity * 100).toFixed(2) + '%';
                similarPairs.push([
                    inputSentences[idx1],
                    articleSentences[idx2],
                    formattedSimilarity
                ]);
                totalSimilarity += similarity;
                countSimilar++;
            }
        });
    });

    const averageSimilarity = countSimilar > 0 ? (totalSimilarity / countSimilar * 100).toFixed(2) + '%' : "0%";
    similarPairs.push(["Average Similarity", averageSimilarity]);
    return similarPairs;
}

module.exports = {jaccardSimilarity, jaccardSentenceSimilarity};
