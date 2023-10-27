// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// App implementation
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors({ origin: 'http://localhost:3001' }));
// access to all ports with *
app.use(cors({ origin: '*' }));

const verifyJWT = (req, res, next) => {
    const  SECRET_KEY = "secretkey23456"; // A remplacer par la même clé secrète que dans la route signin
    const token = req.header('Authorization');
  
    if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
      next(); // Si le token est valide, on passe à la suite
    } catch (error) {
      console.error(error)
      res.status(400).json({ auth: false, message: 'Invalid token.' });
    }
  };


// Routes implementation
app.use('/api', verifyJWT, indexRouter);
app.use('/auth', authRouter);

// Exporte app
module.exports = app;
