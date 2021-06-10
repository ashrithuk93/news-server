const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const News = mongoose.model('News');

const router = express.Router();

router.use(requireAuth);


// extracts all the articles from the DB
router.get('/news', async(req, res) => {
    const news = await News.find({});

    res.send(news);
});

router.post('/news', async (req, res) => {
    const { title, url, imageUrl, addedInfo } = req.body;

    if (!title || !url || !imageUrl || !addedInfo) {
        res.status(422).send({ error: 'Text field can not be empty' });
    }

    try {
        const news = new News({ title, url, imageUrl, addedInfo, userId: req.user._id });
        await news.save();
        res.send(news);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;