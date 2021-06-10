const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    imageUrl: {
        type: String
    },
    addedInfo: {
        type: String
    }
});

mongoose.model('News', newsSchema);