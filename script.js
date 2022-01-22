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
  const API_URL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(API_URL);
    const quotesArray = response.json();
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
  if (quoteText > 120) {
    quoteText.classList.add('long-quote');
  }
  quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
  completeLoading();
  return quote;
}

// Twitter button
async function tweetQuote() {
  const quote = await populateQuote();
  const twitterURL = `https:twitter.com/intent/tweet?text=${quote.text} ~${quote.author}`;
  window.open(twitterURL, '_blank');
  return true;
}
