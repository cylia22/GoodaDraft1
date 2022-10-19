const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const Gooda = require('../models/Gooda');
//const Organization = require('../models/Organization');

mongoose.connect('mongodb://localhost:27017/gooda', {
   
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Gooda.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const good = new Gooda({
            author: '6339decf0d14cde56ee3a29e',
            //location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dfofplzot/image/upload/v1665047176/gooda/kids_leren_2_l7jtln.avif',
                    filename: 'gooda/kids_leren_2_l7jtln'
                  
                },
                
               { url: 'https://res.cloudinary.com/dfofplzot/image/upload/v1665047180/gooda/vrijwilliger_met_twee_oude_mensen_sesfbu.avif',
               filename: 'gooda/vrijwilliger_met_twee_oude_mensen_sesfbu'
            }
                
            ]


            
        })
        await good.save();
    }
}


/*const seedDB = async () => {
    await Organization.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const org = new Organization({
            author: '6339decf0d14cde56ee3a29e',
            //location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dfofplzot/image/upload/v1665047176/gooda/kids_leren_2_l7jtln.avif',
                    filename: 'gooda/kids_leren_2_l7jtln'
                  
                },
                
               { url: 'https://res.cloudinary.com/dfofplzot/image/upload/v1665047180/gooda/vrijwilliger_met_twee_oude_mensen_sesfbu.avif',
               filename: 'gooda/vrijwilliger_met_twee_oude_mensen_sesfbu'
            }
                
            ]
        })
        await org.save();
    }
}*/


seedDB().then(() => {
  mongoose.connection.close();
})

//seed().then(() => {
    //mongoose.connection.close();
//})


