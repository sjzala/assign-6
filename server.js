/******************************************************************************** 
*  WEB322 – Assignment 03 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Shailendrasinh Zala
*  Student ID: 125101220
*  Date: 
********************************************************************************/

const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');
const Sequelize = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Sequelize to point to our PostgreSQL database
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Depending on your SSL setup, you might need to adjust this
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Set the view engine to EJS
    app.set('view engine', 'ejs');

    // Serve static files from the public directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Initialize the lego data
    legoData.initialize().then(() => {
      // Route for the root
      app.get('/', (req, res) => {
        res.render('home', { page: '/' });
      });

      // Route for the about page
      app.get('/about', (req, res) => {
        res.render('about', { page: '/about' });
      });

      // Route to get all lego sets or by theme
      app.get('/lego/sets', (req, res) => {
        const theme = req.query.theme;
        if (theme) {
          legoData.getSetsByTheme(theme).then(sets => {
            res.render('sets', { sets, page: `/lego/sets?theme=${theme}` });
          }).catch(err => {
            res.status(404).render('404', { message: err, page: '' });
          });
        } else {
          legoData.getAllSets().then(sets => {
            res.render('sets', { sets, page: '/lego/sets' });
          }).catch(err => {
            res.status(500).send(err);
          });
        }
      });

      // Route to get a specific set by number
      app.get('/lego/sets/:set_num', (req, res) => {
        const setNum = req.params.set_num;
        legoData.getSetByNum(setNum).then(set => {
          res.render('set', { set, page: `/lego/sets/${setNum}` });
        }).catch(err => {
          res.status(404).render('404', { message: err, page: '' });
        });
      });

      // Custom 404 error page
      app.use((req, res) => {
        res.status(404).render('404', { message: "I'm sorry we're unable to find what you're looking for", page: '' });
      });

      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }).catch(err => {
      console.error("Failed to initialize data:", err);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });