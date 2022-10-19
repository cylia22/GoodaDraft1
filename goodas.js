const Gooda = require('../models/gooda');
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const goodas = await Gooda.find({}).populate('');
    res.render('goodas/index', { goodas })
}

module.exports.renderNewForm = (req, res) => {
    res.render('goodas/new');
}

module.exports.createGooda = async (req, res, next) => {
   // const geoData = await geocoder.forwardGeocode({
       // query: req.body.gooda.location,
        //limit: 1
   // }).send()
    const gooda = new Gooda(req.body.gooda);
    gooda.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    gooda.author = req.user._id;
    await gooda.save();
    console.log(gooda);
    req.flash('success', 'Successfully made a new gooda!');
    res.redirect(`/goodas/${gooda._id}`)
}

module.exports.showGooda = async (req, res,) => {
    const gooda = await Gooda.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!gooda) {
        req.flash('error', 'Cannot find that GOODA!');
        return res.redirect('/goodas');
    }
    res.render('goodas/show', { gooda });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const gooda = await Gooda.findById(id)
    if (!gooda) {
        req.flash('error', 'Cannot find that GOODA!');
        return res.redirect('/goodas');
    }
    res.render('goodas/edit', { gooda });
}

module.exports.updateGooda = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const gooda = await Gooda.findByIdAndUpdate(id, { ...req.body.gooda });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    gooda.images.push(...imgs);
    await gooda.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await gooda.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated gooda!');
    res.redirect(`/goodas/${gooda._id}`)
}

module.exports.deleteGooda = async (req, res) => {
    const { id } = req.params;
    await Gooda.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted gooda')
    res.redirect('/goodas');
}