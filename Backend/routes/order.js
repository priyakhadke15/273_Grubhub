var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const jwt = require("jsonwebtoken");
const { jwtsecret } = require('../config');

const { getOrders, getOrderDetails, saveOrder, saveOrderDetails } = require('../DAL');
const { getItems } = require('../DAL');
// get the buyers order list for past orders and upcoming orders  etc
router.get('/', async function (req, res, next) {

    const { orderID, restaurantId, buyerId, orderDate, deliveryAdd, status, price } = req.body;
    //check if user is logged in
    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    try {
        const user = jwt.verify(req.cookies.authCookie, jwtsecret);
        const order = {
            buyerId: user.id,
            orderID, restaurantId, orderDate, deliveryAdd, status, price
        };
        const { results } = await getOrders(order);
        res.json(results);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
//get orderdetails for detailed view
router.get('/details', async function (req, res, next) {

    const { orderID } = req.body;
    //check if user is logged in
    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    try {
        const orderdetail = {
            orderID
        };
        const { results } = await getOrderDetails(orderdetail);
        res.json(results);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
//submit the buyer's order
/* item input in format [{"itemID":"cdf5b752-4b43-4457-adf6-81d83835bf65","quantity":"2"},
{"itemID":"cdf5b752-4b43-4457-adf6-81d83835bf66","quantity":"1"}]
*/
router.post('/', async function (req, res, next) {
    var total = 0, ordertotal = 0;
    var randNum = uuidv4();
    const { items, restaurantId, deliveryAdd } = req.body;
    const itemjson = JSON.parse(items);

    //check if user is logged in
    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    //check items are selected
    if (itemjson.length == 0) {
        console.error("No item selected");
        return res.status(400).json({ message: "please select atleast one item" });
    }
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var seconds = d.getSeconds();
    var minutes = d.getMinutes();
    var hour = d.getHours();

    try {
        //get item price for each item and calculate order price
        for (var i = 0; i < itemjson.length; i++) {
            const { itemID, quantity } = itemjson[i];
            const item = { itemID };
            const { results } = await getItems(item);
            Restresult = JSON.parse(JSON.stringify(results[0]))
            total = Restresult.price * quantity;

            const orderdetail = {
                orderID: randNum,
                itemprice: Restresult.price,
                totalprice: total,
                itemID, quantity
            };
            await saveOrderDetails(orderdetail);
            ordertotal += total;
        }
        const user = jwt.verify(req.cookies.authCookie, jwtsecret);
        const order = {
            orderID: randNum,
            buyerId: user.id,   //buyer's userid is fetched from authcookie
            orderDate: (curr_year + '-' + curr_month + '-' + curr_date + ' ' + hour + ':' + minutes + ':' + seconds),
            status: 'new',
            price: ordertotal,
            restaurantId, deliveryAdd
        };
        const { results: queryResult } = await saveOrder(order);
        res.json(queryResult);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;