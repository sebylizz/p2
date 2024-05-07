function mergeArrays(cos, jac){
    for(let i = 0; i < jac.length; i++){
        let found = 0;
        for(let j = 0; j < cos.length; j++){
            if(jac[i][0] == cos[j][0] && jac[i][1] == cos[j][1] && jac[i][3] == cos[j][3]){
                cos[j][2] = (cos[j][2]+jac[i][2])/2;
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

module.exports = mergeArrays;