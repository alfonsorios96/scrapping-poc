const puppeteer = require('puppeteer');
const utils = require('./_utils.js');

const amazon = async (productName) => {
    try {
        const domain = 'https://www.amazon.com.mx/';
        // create a new browser instance
        const browser = await puppeteer.launch();
    
        // create a page inside the browser;
        const page = await browser.newPage();
    
        // navigate to a website and set the viewport
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(domain, {
          timeout: 3000000
        });
    
        // search and wait the product list
        await page.type('#twotabsearchtextbox', productName);
        await page.click('input.nav-input');
        await page.waitForSelector('.s-image');
    
        let products = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('.s-result-item'));
          return links.map(link => {
            if (link.querySelector('.a-price-whole')) {
              return {
                name: link.querySelector('.a-size-medium.a-color-base.a-text-normal').textContent,
                price: parseFloat(link.querySelector('.a-price-whole').textContent.replace(/[,.]/g, '')),
              };
            }
          });
        });

        products = products.filter(item => item !== null && item.price > 900);
        const price = utils.definePrice(products);
    
        console.log(price);
        // close the browser
        await browser.close();
      } catch (error) {
        // display errors
        console.log(error);
      }
};

module.exports = amazon;
