const puppeteer = require('puppeteer');
const utils = require('./_utils.js');

const cex = async (productName) => {
    try {
        const domain = 'https://mx.webuy.com/';
        // create a new browser instance
        const browser = await puppeteer.launch();
    
        // create a page inside the browser;
        const page = await browser.newPage();
    
        // navigate to a website
        await page.goto(domain, {
          timeout: 3000000
        });
    
        // search and wait the product list
        await page.type('#stext', productName, {delay: 500});
        await page.click('.searchleft', {delay: 1000, clickCount: 2});
        await page.screenshot({path: 'search-screenshot.png'});
        await page.waitForSelector('.searchRcrd', {timeout: 60000});
        await page.screenshot({path: 'found-screenshot.png'});

        let products = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('.searchRcrd'));
          return links.map(link => {
            if (link.querySelector('.priceTxt')) {
              return {
                name: link.querySelector('div.desc h1 a').textContent,
                price: link.querySelector('.priceTxt').textContent.replace(/[,.a-zA-Z ]/g, ''),
              };
            }
          });
        });

        products = products.filter(item => item !== null);
        // const price = utils.definePrice(products);
    
        console.log(products);
        // close the browser
        await browser.close();
      } catch (error) {
        // display errors
        console.log(error);
      }
};

module.exports = cex;
