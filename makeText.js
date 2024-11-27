const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

// Read from a file
function makeTextFromFile(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file: ${path}\n${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

// Read from a URL
async function makeTextFromURL(url) {
  try {
    let resp = await axios.get(url);
    generateText(resp.data);
  } catch (err) {
    console.log(`Error fetching URL: ${url}\n${err}`);
    process.exit(1);
  }
}

// Generate text using MarkovMachine
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

// Main script logic
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeTextFromFile(path);
} else if (method === "url") {
  makeTextFromURL(path);
} else {
  console.log("Unknown method. Use 'file <path>' or 'url <url>'.");
  process.exit(1);
}
