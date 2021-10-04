const mongoose = require('mongoose');

class Connection{
    constructor(){
        const url = 'mongodb://localhost:27017/products-flat101';

        this.connect(url).then(() =>{
            console.log("MongoDb is working");
        }).catch((err) =>{
            console.error("MONGODB error: ",err.message);
        })
    }

    async connect(url){
        try{
            await mongoose.connect(url);
        }catch(e){
            throw e;
        }
    }
}

module.exports = new Connection();