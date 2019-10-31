const definePrice = (products) => {
  let price = products.reduce((acc, product) => {
    return acc + product.price;
  }, 0);
  price = Number(price);
  price = price / products.length;

  return price;
};

module.exports = {definePrice};
