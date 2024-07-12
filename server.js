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

require('dotenv').config();
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

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
      legoData.getSetsByTheme(theme).then((sets) => {
        res.render('sets', { sets, page: `/lego/sets?theme=${theme}` });
      }).catch((err) => {
        res.status(404).render('404', { message: err, page: '' });
      });
    } else {
      legoData.getAllSets().then((sets) => {
        res.render('sets', { sets, page: '/lego/sets' });
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  });

  // Route to get a specific set by number
  app.get('/lego/sets/:set_num', (req, res) => {
    const setNum = req.params.set_num;
    legoData.getSetByNum(setNum).then((set) => {
      res.render('set', { set, page: `/lego/sets/${setNum}` });
    }).catch((err) => {
      res.status(404).render('404', { message: err, page: '' });
    });
  });

  // Route to display the add set form
  app.get('/lego/addSet', (req, res) => {
    legoData.getAllThemes().then((themes) => {
      res.render('addSet', { themes });
    }).catch((err) => {
      res.status(500).render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
    });
  });

  // Route to handle form submission for adding a new set
  app.post('/lego/addSet', (req, res) => {
    legoData.addSet(req.body).then(() => {
      res.redirect('/lego/sets');
    }).catch((err) => {
      res.status(500).render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
    });
  });

  // Route to display the edit set form
  app.get('/lego/editSet/:num', (req, res) => {
    const setNum = req.params.num;
    Promise.all([legoData.getSetByNum(setNum), legoData.getAllThemes()])
      .then(([set, themes]) => {
        res.render('editSet', { set, themes });
      })
      .catch((err) => {
        res.status(404).render('404', { message: err });
      });
  });
  
  // Route to delete a specific set by number
app.get('/lego/deleteSet/:num', (req, res) => {
  const setNum = req.params.num;
  legoData.deleteSet(setNum).then(() => {
      res.redirect('/lego/sets');
  }).catch((err) => {
      res.render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
  });
});


  // Route to handle form submission for editing a set
  app.post('/lego/editSet', (req, res) => {
    legoData.editSet(req.body.set_num, req.body).then(() => {
      res.redirect('/lego/sets');
    }).catch((err) => {
      res.status(500).render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
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
}).catch((err) => {
  console.error("Failed to initialize data:", err);
});
