const quotes = require('./quoates');
function generator() {
    const len = quotes.length;
    return quotes[Math.ceil(Math.random()*len)].quote;
}
console.log(generator());