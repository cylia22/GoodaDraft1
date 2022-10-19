const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


//const opts = { toJSON: { virtuals: true } };

const GoodaSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: { 
        type: Number,
        min: 10,
    },
    description: String,
    //location: String,
    //createdAt: {
       // Type: Date,
        //immutable: true,
       // default: () => Date.now(),
    //},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    //organizations: 
      //  {
       // type: Schema.Types.ObjectId,
       // ref: 'Organization'
    //}
    
});


/*GoodaSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/goodas/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});*/



GoodaSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})



module.exports = mongoose.model('Gooda', GoodaSchema);




