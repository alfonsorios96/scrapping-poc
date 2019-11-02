const amazon = require('./amazon.js');
const cex = require('./cex.js');
// IIFE
(async () => {
  const productName = 'iphone X';
  await cex(productName);
})();
