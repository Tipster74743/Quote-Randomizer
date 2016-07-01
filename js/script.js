// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
var quote;
var usedQuotes = [];
var quoteTimeout;

/*This generates a random quote. The quotes are pulled from the quotes.js page.
 In order to ensure that every quote is generated at least once before recycling,
 they are spliced out and placed into the usedQuotes array until the quotes are emptied*/
var getRandomQuote = function getRandomQuoteFtn(){
    var quoteLen = quotes.length;
    var randomNumber = Math.floor(Math.random() * quoteLen);

    if(quoteLen === 0){
        quotes = usedQuotes;
    }

    quote = quotes[randomNumber];
    for(var i = 0; i < quoteLen; i++){
        if(quotes[i] === quote){
            quotes.splice(i, 1);
            break;
        }
    }
    usedQuotes.push(quote);
    document.body.style.backgroundColor = changeBackground();
    return quote;
};

//printQuoteFtn prints the quote information onto the page
var printQuote = function printQuoteFtn(){
    var randomQuote = getRandomQuote();
    var message = '<p class="quote">' + randomQuote.quote + '</p>';
    message += '<p>' + '<span class="source">' + randomQuote.source + '</span>';
    if(randomQuote.citation !== "")
    message += '<span class="citation">' + randomQuote.citation + '</span>';
    if(randomQuote.year !== "")
    message += '<span class="year">' + randomQuote.year + '</span>' + '</p>';
    document.getElementById('quote-box').innerHTML = message;
    clearTimeout(quoteTimeout);
    autoChangeQuote();
};

/*This function is called in the getRandomQuoteFtn to set the background of the body
  It uses a hexadecimal number to randomly change the number. The colors will all be
   relatively dark, but this can be improved on later.*/
var changeBackground = function changeBackgroundFtn() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

var autoChangeQuote = function autoChangeQuoteFtn(){
    quoteTimeout = setTimeout(printQuote, 10000);
};

printQuote();
autoChangeQuote();

document.getElementById('loadQuote').addEventListener("click", printQuote, false);

