var express = require('express'),
  router = express.Router(),
  data = require('../models/dataModel');

  

/* GET home page. */
router.get('/', async (req, res) => {

//List of all Restaurants
const allData = await data.getAllData();

  res.render('template', {
    locals: {
      title: 'grubanalysis',
      allData: allData,
      session: req.session
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

/* Get By Id */
router.get('/:id?', async function(req, res) {

const { id } = req.params;
//Individual restaurant data
idData = await data.getById(id);

//All Review Data
reviewData = await data.getAllReviews(id);

  res.render('template', {
    locals: {
      title: 'Grubanalysis',
      idData: idData,
      reviewData: reviewData,
      session: req.session
    },
    partials: {
      partial: 'partial-single'
    }
  });
});

//ROUTER POST
router.post('/', (req,res) => {
  const { restaurant_id, review_title, review_stars,review_text} = req.body;

  //TODO: Add Review Method Goes Here

  res.status(200).redirect(`/${restaurant_id}`);
})

module.exports = router;
