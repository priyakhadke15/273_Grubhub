var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtsecret } = require('../config');

const { getRestaurants, saveRestaurant, editRestaurant } = require('../DAL')
const { getItems } = require('../DAL')

// edit the owner's restaurant
router.put('/', async function (req, res, next) {
    const { name, image, address, cuisine, zipcode } = req.body;

    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    try {
        //get user id from authCookie
        const user = jwt.verify(req.cookies.authCookie, jwtsecret);
        //Object for restaurant to edit
        restaurant = {
            ownerId: user.id,
            name, image, address, cuisine, zipcode
        }
        await editRestaurant(restaurant);
        res.json({ message: "Details updated" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
// get the item list for one restaurant
router.get('/item', async function (req, res, next) {
    let item;
    if (!(req.cookies.authCookie)) {
        console.error("Unauthorised access");
        return res.status(401).json({ message: "please login to continue" });
    }
    try {
        const user = jwt.verify(req.cookies.authCookie, jwtsecret);
        if (!user.isSeller) {
            console.error("Unauthorised access");
            return res.status(401).json({ message: "please login to continue" });
        }
        //restaurant object to get the rest ID
        restaurant = {
            ownerId: user.id
        }
        const { results } = await getRestaurants(restaurant);
        if (results.length == 1) {
            rest = results[0];
        }
        //Object for item to search
        item = {
            restaurantId: rest.restaurantId
        }
        const { results: queryresult } = await getItems(item);
        res.json(queryresult);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
module.exports = router;


