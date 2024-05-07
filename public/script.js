


        
        const textarea = document.getElementById('inputContent');
        const runbutton = document.getElementById('runbutton');
        const animationDiv = document.querySelector('.animation');
        const rightside = document.querySelector('.rightside');
        // const detailbutton = document.getElementById('detailbutton');
    
        //Placeholder skal implementeres på en anden måde, så jeg har commented den her ud for nu
        /*textarea.addEventListener('input', function() {
            if (this.value) {
                this.style.fontStyle = 'normal';
                this.style.color = 'black';
            } else {
                this.style.fontStyle = 'italic';
                this.style.color = '#9e9c9a';
            }
        });*/
        // adds backgroundcolor to input sentence to see which sentence in output matches.
        function mark(i){
            let markSentence = document.getElementById(`inpsent${i}`);
            markSentence.classList.add('mouseover');
        }

        function unmark(i){
            let markSentence = document.getElementById(`inpsent${i}`);
            markSentence.classList.remove('mouseover');
        }
        function articledetails(article) {
            alert("idsagr")
            //results:
            document.getElementById('jaccardSimilarity').innerHTML = `Final Jaccard Similarity: ${article.jaccardSimilarity[0]}`;
            document.getElementById('cosineSimilarity').innerHTML = `Final Cosine Similarity: ${article.cosineSimilarity[0]}%`;
            document.getElementById('averageSimilarity').innerHTML = `Average Similarity: test`;
            // skal være link i stedet for title
            document.getElementById('articlelink').innerHTML = `Link: ${article.title}`;
            // er kun første sætning for nu
            document.getElementById('fullarticle').innerHTML = `Full Article: ${article.fullContent}`;
            // open detailbox
            document.getElementById('detailbox').style.display = "block";
            document.getElementById('detailclosebutton').style.display = "block";
            }
        // close detailbox
        document.getElementById("detailclosebutton").addEventListener("click", function() {
            document.getElementById("detailbox").style.display = "none";
            document.getElementById("detailclosebutton").style.display = "none";

            })

        runbutton.addEventListener('click', function() {
            // clear the output area
            document.getElementById('articleContent').innerHTML = "";
            // remove detailbutton if no match is found and give error message
            // document.getElementById('detailbutton').style.display = "none";
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
            rightside.style.display = 'block';
    
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
                const output = document.getElementById('articleContent')
                output.innerHTML += `<p>Hover over a sentence to see matching sentence in input and similarity percentage </p>`
                    for (let i = 0; i < data.articles.length; i++) {
                        let temp = 0;
                        data.articles[i].sentences.forEach(element => {
                            if (element.percentage > 50){
                                temp = 1;
                            }
                        });
                        if (temp == 1){
                            output.innerHTML += `<h3 onclick="articledetails(${data.articles[i]})">Article name: ${data.articles[i].title}</h3>`
                        }
                        for(let j = 0; j < data.articles[i].sentences.length; j++) {
                        if (data.articles[i].sentences[j].percentage > 50.0){
                                if (data.articles[i].sentences[j].percentage > 90) {
                                    output.innerHTML += `<p class = "sentence90" title="${data.articles[i].sentences[j].percentage}%" onmouseover="mark(${data.articles[i].sentences[j].inputIndex})" onmouseout="unmark(${data.articles[i].sentences[j].inputIndex})"">${data.articles[i].sentences[j].content}</p>`
                                }
                                else if (data.articles[i].sentences[j].percentage > 80){
                                    output.innerHTML += `<p class = "sentence80" title="${data.articles[i].sentences[j].percentage}%" onmouseover="mark(${data.articles[i].sentences[j].inputIndex})" onmouseout="unmark(${data.articles[i].sentences[j].inputIndex})"">${data.articles[i].sentences[j].content}</p>`
                                }
                                else if (data.articles[i].sentences[j].percentage > 70){
                                    output.innerHTML += `<p class = "sentence70" title="${data.articles[i].sentences[j].percentage}%" onmouseover="mark(${data.articles[i].sentences[j].inputIndex})" onmouseout="unmark(${data.articles[i].sentences[j].inputIndex})"">${data.articles[i].sentences[j].content}</p>`
                                }
                                else if (data.articles[i].sentences[j].percentage > 60){
                                    output.innerHTML += `<p class = "sentence60" title="${data.articles[i].sentences[j].percentage}%" onmouseover="mark(${data.articles[i].sentences[j].inputIndex})" onmouseout="unmark(${data.articles[i].sentences[j].inputIndex})"">${data.articles[i].sentences[j].content}</p>`
                                }
                                else if (data.articles[i].sentences[j].percentage > 50){
                                    output.innerHTML += `<p class = "sentence50" title="${data.articles[i].sentences[j].percentage}%" onmouseover="mark(${data.articles[i].sentences[j].inputIndex})" onmouseout="unmark(${data.articles[i].sentences[j].inputIndex})"">${data.articles[i].sentences[j].content}</p>`
                                }
                            }
                        }
                }
                match = output.innerHTML.search(/class/gmi);
                console.log(match)
                if (match==-1) { // Ensure proper output for when no matching sentences
                    output.innerHTML = '<h3>No Matches found</h3>'
                    
                }
                /* else { //display detail button if match(es) found
                    document.getElementById('detailbutton').style.display = "block";
                } */
                
            })
            .catch((error) => {
                console.error('Error:', error);
                resultDisplay.textContent = 'Error calculating similarity. Please try again.';
                animationDiv.style.display = 'none';
                animationDiv.classList.remove('active');
            });
        });      
    