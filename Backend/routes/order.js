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
router.post('/', async function (req, res, next) {
    var total = 0, ordertotal = 0;
    const {
        itemID, quantity,
        restaurantId, deliveryAdd
    } = req.body;
    //check if user is logged in
    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();

    try {
        const user = jwt.verify(req.cookies.authCookie, jwtsecret);
        const item = {
            itemID
        };
        const { results } = await getItems(item);
        Restresult = JSON.parse(JSON.stringify(results[0]))
        total += Restresult.price * quantity;
        const orderdetail = {
            orderID: uuidv4(),
            itemprice: Restresult.price,
            totalprice: total,
            itemID, quantity
        };
        await saveOrderDetails(orderdetail);

        ordertotal += orderdetail.totalprice;
        const order = {
            orderID: orderdetail.orderID,
            buyerId: user.id,   //buyer's userid is fetched from authcookie
            orderDate: (curr_year + '-' + curr_month + '-' + curr_date),
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