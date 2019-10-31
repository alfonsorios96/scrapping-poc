const amazon = require('./amazon.js');
// IIFE
(async () => {
  const productName = 'iphone X';
  await amazon(productName);
})();
