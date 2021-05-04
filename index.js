const express = require('express');
const fs = require('fs');

const app = express()
const port = 3000

// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


/* endpoint to view the inventory */

app.get('/view/inventory', function (req, res) {
    const data = JSON.parse(fs.readFileSync('./inventory.json', "utf8"));
    res.send(data);
});

 
/* endpoint to fetch the available stock in the inventory using article id */

app.get('/view/inventory/:id', function (req, res) {
    const data = JSON.parse(fs.readFileSync('./inventory.json', "utf8"));
    const { inventory } = data;
    const id = req.params.id;
    const articleInfo = inventory.filter((item) => item.art_id === id);
    res.send(articleInfo[0]);
}); 

/* endpoint to view the products */

app.get('/view/products-info', function (req, res) {
    const data = JSON.parse(fs.readFileSync('./products.json', "utf8"));
    res.send(data);
});

/* endpoint to buy the product
    body: {
        "orderDetails": {
            "productName": "Dining Chair",
            "quantity": "1"
        }
    }
*/

app.post('/buy-product', function(req, res) {
    let orderDetails = req.body.orderDetails;
    if(validateOrder(orderDetails)) {
        updateInventory(orderDetails);
        updateStock(orderDetails);
        res.send({
            status: 200,
            message: 'order placed successfully'
        });
    }
    res.send({
        status: 404,
 message: 'Failed'
    });
});


/* endpoint to view the all products and quantity of each that is an available with the current inventory */

app.get('/view/products-stock', function(req, res) {
    const data = JSON.parse(fs.readFileSync('./stock.json', "utf8"));
    res.send(data);
}) 

/* helper function to update stock */

function updateStock({productName, quantity}) {
    const data = JSON.parse(fs.readFileSync('./stock.json', "utf8"));
    const { stock } = data;
    let product = stock.filter((item) => item.name === productName)[0];
    product.stock = (parseInt(product.stock) - parseInt(quantity)).toString();

    fs.writeFileSync('./stock.json', JSON.stringify(data, null, 2));
}
  

/* helper function to update inventory */

function updateInventory({productName, quantity}) {
    const data = JSON.parse(fs.readFileSync('./products.json', "utf8"));
    const inventoryData = JSON.parse(fs.readFileSync('./inventory.json', "utf8"));
    console.log('before', inventoryData);
    const { contain_articles } = data.products.filter((product) => product.name === productName)[0];
    for(let i = 0;  i < contain_articles.length; i++) {
        let { art_id, amount_of } = contain_articles[i];
        let articleInfo = inventoryData.inventory.filter((item) => item.art_id === art_id)[0];
        articleInfo.stock = (parseInt(articleInfo.stock) - (parseInt(amount_of)*parseInt(quantity))).toString();
    }
    console.log('after', inventoryData);
    fs.writeFileSync('./inventory.json', JSON.stringify(inventoryData, null, 2));
}

/* helper function to validate the order with the available stock */

function validateOrder({productName, quantity}) {
    const data = JSON.parse(fs.readFileSync('./stock.json', "utf8"));
    let { stock } = data.stock.filter((item) => item.name === productName)[0];
    if(parseInt(stock) < parseInt(quantity)) {
        return false;
    }

    return true; 
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  

module.exports = app;