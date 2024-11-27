class MarkovMachine {
  constructor(text) {
    this.words = text.split(/\s+/); // Split text into words
    this.chain = this.makeChains(); // Build the word chain
  }

  // Build the word chain
  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null; // null indicates end of chain

      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let result = [];

    while (result.length < numWords && key !== null) {
      result.push(key);
      let nextWords = this.chains[key];
      key = nextWords[Math.floor(Math.random() * nextWords.length)];
    }
    return result.join(" ");
  }
}

module.exports = { MarkovMachine };
