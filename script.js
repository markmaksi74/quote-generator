// window.open(url, '_blank')

let QUOTE_POPULATED = {
  text: "Knowledge is power, and if your knowledge doesn't arm you with power, you acquire false knowledge.",
  author: 'Mark Maksi',
};

// Show loader
function loading() {
  const loader = document.getElementById('loader');
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.setAttribute('hidden', '');
  loader.removeAttribute('hidden', '');
}

// Hide Loading
function completeLoading() {
  const loader = document.getElementById('loader');
  const quoteContainer = document.getElementById('quote-container');
  loader.setAttribute('hidden', '');
  quoteContainer.removeAttribute('hidden', '');
}

// Get quotes from API
async function getAllQuotes() {
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
  const API_URL2 = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en?format=json'
  const API_URL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(API_URL);
    const quotesArray = await response.json();
    console.log(quotesArray)
    return quotesArray;
  } catch (error) {
    console.log(error);
    getAllQuotes();
  }
}

// Picking one quote
async function pickNewQuote() {
  const quotesArray = await getAllQuotes();
  const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
  QUOTE_POPULATED = quote;
  return quote;
}

/* Don't use event listneres to the global context 
/* adding DOM elements as constants inside functions is best practice to force garbage collection by JS */

// Populating the quote to the UI
async function populateQuote() {
  loading();
  // awaiting for the random quote to be ready....
  const quote = await pickNewQuote();
  const quoteText = document.getElementById('quote');
  const quoteAuthor = document.getElementById('author');
  if (!quoteAuthor) {
    quoteAuthor.textContent = 'Unknown';
  }
  quoteAuthor.textContent = quote.author;
  if (quoteText.length > 100) {
    quoteText.classList.add('long-quote');
  }
  quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
  completeLoading();
  return quote;
}

// Twitter button
async function tweetQuote() {
  const twitterURL = `https://www.twitter.com/intent/tweet?text="${QUOTE_POPULATED.text}" ~${QUOTE_POPULATED.author}`;
  window.open(twitterURL, '_blank');
  return true;
}
