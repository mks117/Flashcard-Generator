
var ClozeCard = function(text, cloze) {
    this.cloze = cloze;
    this.clozedText = text.replace(cloze, '...');
    this.answer = text;
}

module.exports = ClozeCard;