const textarea = document.getElementById('inputContent');
const runbutton = document.getElementById('runbutton');
const animationDiv = document.querySelector('.animation')
const output = document.getElementById("articleContent");

function mark(i){
    let markSentence = document.getElementById(`inpsent${i}`);
    markSentence.classList.add('mouseover');
}

function unmark(i){
    let markSentence = document.getElementById(`inpsent${i}`);
    markSentence.classList.remove('mouseover');
}

// close detailbox
document.getElementById("detailclosebutton").addEventListener("click", function() {
    document.getElementById("detailbox").style.display = "none";
    document.getElementById("detailclosebutton").style.display = "none";
})

runbutton.addEventListener('click', function() {
    // clear the output area
    //output.innerHTML = "";
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
            const temp = document.createElement('span');
            temp.id = `inpsent${i}`;
            temp.textContent = data.inputSentenized[i].trim()+' ';
            newText.appendChild(temp);
        }

        textarea.appendChild(newText);
        
        // Add titles to sentences with similarity percent + add color matching percentage + add mark function
        for (let i = 0; i < data.articles.length; i++) {
            let newElement = document.createElement("div");
            let cur = data.articles[i];
            let temp = 0;
            data.articles[i].sentences.forEach(element => {
                if (element.percentage > 50){
                    temp = 1;
                }
            });

            if (temp == 1){
                let newh3 = document.createElement("h3");
                newh3.innerText = data.articles[i].title;

                newh3.addEventListener("click", () => {
                    //results:
                    document.getElementById('jaccardSimilarity').innerHTML = `Final Jaccard Similarity: ${cur.jaccard}%`;
                    document.getElementById('cosineSimilarity').innerHTML = `Final Cosine Similarity: ${cur.cosine}%`;
                    document.getElementById('averageSimilarity').innerHTML = `Average Similarity: ${cur.average}`;
                    document.getElementById('articlelink').innerHTML = `<a href="${cur.link}">Link to article</a>`;
                    document.getElementById('plagtype').innerHTML = `Plagiarism Type: <br> Men hvis amtet repræsenterer heterogeniteten i partiets koalition, viser det også de skel, der river den fra hinanden. `;
                    // open detailbox
                    document.getElementById('detailbox').style.display = "block";
                    document.getElementById('detailclosebutton').style.display = "block";
                });

                newElement.appendChild(newh3);
            }

            for(let j = 0; j < data.articles[i].sentences.length; j++) {
                if (data.articles[i].sentences[j].percentage > 50.0){
                    let newP = document.createElement("p");
                    newP.innerText = data.articles[i].sentences[j].content;
                    newP.title = data.articles[i].sentences[j].percentage+"%";
                    newP.addEventListener("mouseover", () => mark(data.articles[i].sentences[j].inputIndex));
                    newP.addEventListener("mouseout", () => unmark(data.articles[i].sentences[j].inputIndex));
                    if (data.articles[i].sentences[j].percentage > 90) {
                        newP.className = "sentence90";
                    }
                    else if (data.articles[i].sentences[j].percentage > 80){
                        newP.className = "sentence80";
                    }
                    else if (data.articles[i].sentences[j].percentage > 70){
                        newP.className = "sentence70";
                    }
                    else if (data.articles[i].sentences[j].percentage > 60){
                        newP.className = "sentence60";
                    }
                    else if (data.articles[i].sentences[j].percentage > 50){
                        newP.className = "sentence50";
                    }
                    newElement.appendChild(newP);
                }
            }
            output.appendChild(newElement);
        }
        match = output.innerHTML.search(/class/gmi);
        console.log(match)
        if (match==-1) { // Ensure proper output for when no matching sentences
            output.innerHTML = '<h3>No Matches found</h3>';
        }
        
    })
    .catch((error) => {
        console.error('Error:', error);
        resultDisplay.textContent = 'Error calculating similarity. Please try again.';
        animationDiv.style.display = 'none';
        animationDiv.classList.remove('active');
    });
});