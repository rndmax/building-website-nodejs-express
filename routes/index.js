const express = require('express');
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const topSpeakers = await speakersService.getList();
            const allArtworks = await speakersService.getAllArtwork();
            return response.render('layout', {
                pageTitle: 'Welcome',
                template: 'index',
                topSpeakers,
                allArtworks,
            });
        } catch (error) {
            return next(error);
        }
    });

    router.use('/speakers', speakerRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
};