function isDigit(char){
    return char >= '0' && char <= '9';
} 
module.exports.isNumber = (str) => {
    if (str===undefined || str===null || str==='') {
        return false;
    }
    for (let i = 0; i < str.length; i++) {
        if (!isDigit(str[i])) {
            return false;
        }
    }
    return true;
}