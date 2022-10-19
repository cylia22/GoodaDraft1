const Gooda = require('../models/gooda');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const gooda = await Gooda.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    gooda.reviews.push(review);
    await review.save();
    await gooda.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/goodas/${gooda._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Gooda.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/goodas/${id}`);
}