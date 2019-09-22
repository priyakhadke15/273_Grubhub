var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const { jwtsecret, encrAlgorithm, encrSecret } = require('../config');
const { getPersons, savePerson } = require('../DAL')
const { saveRestaurant } = require('../DAL')

// crypto (can be updated to use 'bcrypt' instead)
const _encrypt = password => {
  const cipher = crypto.createCipher(encrAlgorithm, encrSecret);
  let ciphered = cipher.update(password, 'utf8', 'hex');
  ciphered += cipher.final('hex');
  return ciphered;
};

const _decrypt = encrypted => {
  const decipher = crypto.createDecipher(encrAlgorithm, encrSecret);
  let deciphered = decipher.update(encrypted, 'hex', 'utf8');
  deciphered += decipher.final('utf8');
  return deciphered;
};


// get all users (test route)
router.get('/', async function (req, res, next) {
  try {
    const { results } = await getPersons();
    res.json(results);
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

// save user (signup)
router.post('/', async (req, res, next) => {
  const { email, password, firstName, lastName, profileImage, restName, restZipCode } = req.body;
  const isSeller = req.body.isSeller === 'true' || req.body.isSeller === true;

  // make sure mandatory keys are present
  if (!(email && password && firstName && lastName)) {
    console.error('save users, mandatory buyer info missing');
    return res.status(400).json({message: "mandatory buyer info missing"});
  }
  //check mandatory seller keys are present
  let restaurant = null;
  if (isSeller) {
    if (!(restName && restZipCode)) {
      console.error('save users, mandatory seller info missing');
      return res.status(400).json({message: 'mandatory seller info missing '});
    }
    else {
      restaurant = {
        restaurantId: uuidv4(),
        ownerId: uuidv4(),
        name: restName,
        address: '',
        cuisine: '',
        image: '',
        zipcode: restZipCode
      }
    }
  }

  const person = {
    id: restaurant ? restaurant.ownerId : uuidv4(),
    password: _encrypt(password),
    isSeller, email, firstName, lastName, profileImage
  }
  try {
    const { results } = await savePerson(person);
    isSeller && (await saveRestaurant(restaurant));
    res.json(results);
  } catch (e) {
    console.error('error creating a new user or restaurant', e);
    res.status(500).json({message: e.message || e});
  }
});

// login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    console.error('login, email/password missing');
    return res.status(400).json({message: "invalid credentials"});
  }

  try {
    const { results } = await getPersons({ email, password: _encrypt(password) });
    if (results.length == 1) {
      const user = results[0];
      const authCookie = jwt.sign({
        id: user.id,
        email: user.email,
        isSeller: user.isSeller === 1
      }, jwtsecret, { expiresIn: "7d" });
      res.cookie('authCookie', authCookie, { maxAge: 900000, httpOnly: false, path: '/' });
      return res.json(user);
    } else {
      console.error('login, no user found: bad credentials');
      return res.status(400).json({message: "bad credentials"});
    }
  } catch (e) {
    console.error('error in login', e);
    res.status(500).json({message: e.message || e});
  }
});

module.exports = router;
