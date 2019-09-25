var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const jwt = require("jsonwebtoken");
const { jwtsecret } = require('../config');

const { getOrders, getOrderDetails } = require('../DAL');
// get the buyers order list for past orders and upcoming orders  etc
router.get('/', async function (req, res, next) {
    let allOrderdetails;
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

module.exports = router;