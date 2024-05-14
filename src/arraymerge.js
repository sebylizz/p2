function mergeDocArrays(cos, jac){
    let arr = [];
    // Merged arr format: (index, cos%, jac%, average%)
    for(let i = 0; i < cos.length; i++){
        arr.push([cos[i][1], cos[i][0], 0, cos[i][0]]);
    }
    for(let i = 0; i < jac.length; i++){
        let found = 0;
        for(let j = 0; j < arr.length; j++){
            if(jac[i][1] == arr[j][0]){
                arr[j][2] = jac[i][0];
                arr[j][3] = parseFloat(((arr[j][1]+jac[i][0])/2).toFixed(2));
                found = 1;
                break;
            }
        }

        if(found == 0){
            arr.push([jac[i][1], 0, jac[i][0], jac[i][0]]);
        }
    }

    return arr;
}

// merge final sentence jaccard + cosine
function mergeSentArrays(cos, jac){
    for(let i = 0; i < jac.length; i++){
        let found = 0;
        for(let j = 0; j < cos.length; j++){
            if(jac[i][0] == cos[j][0] && jac[i][1] == cos[j][1] && jac[i][3] == cos[j][3]){
                cos[j][2] = parseFloat(((cos[j][2]+jac[i][2])/2).toFixed(2));
                found = 1;
                break;
            }
            if(jac[i][0] == cos[j][0]){
                cos[j] = (jac[i][2] > cos[j][2]) ? jac[i] : cos[j];
                found = 1;
                break;
            }
        }

        if(found == 0){
            cos.push(jac[i]);
        }
    }

    return cos;
}

module.exports = { mergeDocArrays, mergeSentArrays };