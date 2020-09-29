let strongs = 'παραζηλόω'
let lex = 'Χριστός';

console.log("Codes for strongs:");
for (let i in strongs) {
    console.log(strongs.charCodeAt(i).toString(16));
}

console.log("Codes for lex:");
for (let i in lex) {
    console.log(lex.charCodeAt(i).toString(16));
}
