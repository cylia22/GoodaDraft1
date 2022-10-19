const express = require('express');
const router = express.Router();
const goodas = require('../controllers/goodas');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateGooda } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Gooda = require('../models/gooda');

router.route('/')
    .get(catchAsync(goodas.index))
    .post(isLoggedIn, upload.array('image'), validateGooda, catchAsync(goodas.createGooda))


router.get('/new', isLoggedIn, goodas.renderNewForm)

router.route('/:id')
    .get(catchAsync(goodas.showGooda))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateGooda, catchAsync(goodas.updateGooda))
    .delete(isLoggedIn, isAuthor, catchAsync(goodas.deleteGooda));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(goodas.renderEditForm))



module.exports = router;