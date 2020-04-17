const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const speakers = await speakersService.getList();
            const allArtworks = await speakersService.getAllArtwork();
            return response.render('layout', {
                pageTitle: 'Speakers',
                template: 'speakers',
                speakers,
                allArtworks,
            });
        } catch (error) {
            return next(error);
        }
    });

    router.get('/:shortname', async(request, response, next) => {
        try {
            const speaker = await speakersService.getSpeaker(request.params.shortname);
            const allArtworks = await speakersService.getArtworkForSpeaker(request.params.shortname);
            return response.render('layout', {
                pageTitle: 'Speakers',
                template: 'speakers-detail',
                speaker,
                allArtworks,
            });
        } catch (error) {
            return next(error);
        }
    });

    return router;
};