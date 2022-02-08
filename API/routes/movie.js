const express = require('express');
const { fetch, authenticateAdminOnly } = require('../middleware/TokenVerification');
const Movie = require('../models/Movie');
const router = express.Router();

//Route-1: Create a new movie
router.post('/', authenticateAdminOnly, async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ error: errors });
    }
})

//Route-2: Updating an existing movie
router.put('/:id', authenticateAdminOnly, async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ error: { alert: "Not Found!" } });

        movie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        return res.status(200).json(movie);
    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ error: errors });
    }
});

//Route-3: Deleting an existing movie
router.delete('/:id', authenticateAdminOnly, async (req, res) => {
    try {
        let movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie)
            return res.status(404).json({ error: { alert: "Not Found" } });

        return res.status(200).json({ message: { alert: "Movie has been deleted successfully!" } });
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Route-4: Getting details of an existing movie
router.get('/find/:id', fetch, async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie)
            return res.status(404).json({ error: { alert: "Not Found" } });

        return res.status(200).json(movie);
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Route-5: Getting details of a random movie/series
router.get('/random', fetch, async (req, res) => {
    const type = req.query.type;
    let movies;
    try {
        if (type === 'series') {
            movies = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        }
        else {
            movies = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }

        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Route-6: Filtering details of existing movies
router.get('/', fetch, async (req, res) => {
    const queryNew = req.query.new;
    try {
        let movies;
        if (queryNew) {
            movies = await Movie.find().sort({ _id: -1 }).limit(5);
        }
        else {
            movies = await Movie.find();
        }
        res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Utility Functions
function handleErrors(err) {
    const errors = { title: '', description: '', image: '', alert: '' };
    if (err.message.includes("Validation failed") || err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.code === 11000)
        errors.alert = "Movie already exists";

    return errors;
}

module.exports = router;