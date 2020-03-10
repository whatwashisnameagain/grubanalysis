const express = require('express'),
    router = express.Router();

router.get('/about', (req,res) => {
    res.render('template', {
      locals: {
        title: 'Grubanalysis | About'
      },
      partials: {
        partial: 'partial-about'
      }
    })
});

module.exports = router;