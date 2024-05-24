const textarea = document.getElementById('inputContent');
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');
const animationDiv = document.querySelector('.animation')
const output = document.getElementById("articleContent");
let matchcheck = false;

// add mouseover mark to output sentence on input sentence
function mark(i){
    let markSentence = document.getElementById(`inpsent${i}`);
    markSentence.classList.add('mouseover');
}
// remove mark from above
function unmark(i){
    let markSentence = document.getElementById(`inpsent${i}`);
    markSentence.classList.remove('mouseover');
}

// close detailbox
document.getElementById("detailclosebutton").addEventListener("click", function() {
    document.getElementById("detailbox").style.display = "none";
    document.getElementById("detailclosebutton").style.display = "none";
})

// run function
function run() {
    // clear the output area
    output.innerHTML = "";
    if (textarea.textContent.trim().length < 1){
        alert("The input can not be empty.");
        return;
    }
    // alert user input too long
    if (textarea.textContent.trim().length > 5000){
        alert("Sorry, the input is too long.");
        return;
    }

    animationDiv.style.display = 'block';
    animationDiv.classList.add('active');
    output.style.display = 'block';

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: textarea.textContent
        }),
    })
        .then(response => response.json())
        .then(data => {
            animationDiv.style.display = 'none';
            animationDiv.classList.remove('active');

            // WIP: Replacer input med sentenized input
            textarea.textContent = "";

            let newText = document.createElement('div');

            for (let i = 0; i < data.inputSentenized.length; i++){
                const articleUse = document.createElement('span');
                articleUse.id = `inpsent${i}`;
                articleUse.textContent = data.inputSentenized[i].trim()+' ';
                newText.appendChild(articleUse);
            }

            textarea.appendChild(newText);

            // Add titles to sentences with similarity percent + add color matching percentage + add mark function
            for (let i = 0; i < data.articles.length; i++) {
                let articleDiv = document.createElement("div");
                let curArticle = data.articles[i];
                let articleUse = false;
                data.articles[i].sentences.forEach(element => {
                    if (element.percentage > 25){
                        articleUse = true;
                        matchcheck = true;
                    }
                });

                if (articleUse == 1){
                    let articleTitle = document.createElement("h3");
                    articleTitle.innerText = data.articles[i].title;
                    // Make article title clickable that opens detailbox
                    articleTitle.addEventListener("click", () => {
                        //results:
                        document.getElementById('jaccardSimilarity').innerHTML = `Final Jaccard Similarity: ${curArticle.jaccard}%`;
                        document.getElementById('cosineSimilarity').innerHTML = `Final Cosine Similarity: ${curArticle.cosine}%`;
                        document.getElementById('averageSimilarity').innerHTML = `Average Similarity: ${curArticle.average}%`;
                        document.getElementById('articlelink').innerHTML = `<a href="${curArticle.link}">Link to article</a>`;
                        // open detailbox
                        document.getElementById('detailbox').style.display = "block";
                        document.getElementById('detailclosebutton').style.display = "block";
                    });

                    articleDiv.appendChild(articleTitle);
                }
                // add color and mark/unmark functions to output sentences
                for(let j = 0; j < data.articles[i].sentences.length; j++) {
                    if (data.articles[i].sentences[j].percentage > 25.0){
                        document.getElementById(`inpsent${data.articles[i].sentences[j].inputIndex}`).classList.add("markedSent");
                        let outputSent = document.createElement("p");
                        outputSent.innerText = data.articles[i].sentences[j].content;
                        outputSent.title = data.articles[i].sentences[j].percentage+"%";
                        outputSent.addEventListener("mouseover", () => mark(data.articles[i].sentences[j].inputIndex));
                        outputSent.addEventListener("mouseout", () => unmark(data.articles[i].sentences[j].inputIndex));
                        if (data.articles[i].sentences[j].percentage > 90) {
                            outputSent.className = "sentence90";
                        }
                        else if (data.articles[i].sentences[j].percentage > 80){
                            outputSent.className = "sentence80";
                        }
                        else if (data.articles[i].sentences[j].percentage > 70){
                            outputSent.className = "sentence70";
                        }
                        else if (data.articles[i].sentences[j].percentage > 60){
                            outputSent.className = "sentence60";
                        }
                        else if (data.articles[i].sentences[j].percentage > 50){
                            outputSent.className = "sentence50";
                        }
                        else if (data.articles[i].sentences[j].percentage > 40){
                            outputSent.className = "sentence40";
                        }
                        else if (data.articles[i].sentences[j].percentage > 25){
                            outputSent.className = "sentence25";
                        }
                        articleDiv.appendChild(outputSent);
                    }
                }
                output.appendChild(articleDiv);
            }

            clearButton.style.display = 'block';
            runButton.style.marginLeft = "90px";
            runButton.style.float = "left";
            textarea.contentEditable = false;

            // Ensure proper output for when no matching sentences
            if (matchcheck == false) { 
                output.innerHTML = '<h2>No Matches found</h2>';
            }

        })
        .catch((error) => {
            console.error('Error:', error);
            output.textContent = 'Error calculating similarity. Please try again.';
            animationDiv.style.display = 'none';
            animationDiv.classList.remove('active');
        });
};

// run on Enter
textarea.addEventListener('keypress', (e) => {
    if (e.key == "Enter" && !e.getModifierState("Shift")) {
        run();
    }
});

// run on button
runButton.addEventListener('click', run);
