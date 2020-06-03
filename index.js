const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {    
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    
    if (pathName === '/products' || pathName === '/') {        
        // PRODUCTS OVERVIEW
        res.writeHead(200, { 'Content-type': 'text/html'});        
        res.end("This is the PRODUCTS page!");            
    }        
    else if (pathName === '/laptop' && id < laptopData.length) {        
        // LAPTOP DETAIL
        res.writeHead(200, { 'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            
            let output = data.replace(/{%PRODUCTNAME%}/g, laptopData[id].productName);
            // let output = output.replace(/{%IMAGE%}/g, laptop.image);
            // let output = output.replace(/{%PRICE%}/g, laptop.price);
            // let output = output.replace(/{%SCREEN%}/g, laptop.screen);
            // let output = output.replace(/{%CPU%}/g, laptop.cpu);
            // let output = output.replace(/{%STORAGE%}/g, laptop.storage);
            // let output = output.replace(/{%RAM%}/g, laptop.ram);
            // let output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            // let output = output.replace(/{%ID%}/g, laptop.id);
            res.end(output);            
        });
    }         
    else {
        
        res.writeHead(404, { 'Content-type': 'text/html'}); 
        res.end('URL was not found on the server!');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});


function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}