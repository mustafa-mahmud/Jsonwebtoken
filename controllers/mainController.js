require('dotenv').config();

const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');

const login = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new CustomError('Pls provide Name & Password', 400);
  }

  //create jsonwebtoken
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //send token to brwoser
  res.status(StatusCodes.OK).json({ msg: 'Token saved successfully', token });
};

const dashboard = (req, res) => {
  //create random numbers between 1 to 100
  const luckyNum = Math.floor(Math.random() * 100) + 1;

  //check is token available
  const token = req.headers.authorization;

  if (!token) throw new CustomError('Token not found', 404);

  //send random nums as a lucky num
  res.status(200).json({ msg: `Your lucky number is ${luckyNum}` });
};

module.exports = { login, dashboard };
