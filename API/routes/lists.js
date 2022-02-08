const express = require('express');
const { fetch, authenticateAdminOnly } = require('../middleware/TokenVerification');
const List = require('../models/List');
const router = express.Router();

//Route-1: Create a new list 
router.post('/', authenticateAdminOnly, async (req, res) => {
    try {
        const newList = await List.create(req.body);
        res.status(201).json(newList);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ error: errors });
    }
})

//Route-2: Updating an existing list
router.put('/:id', authenticateAdminOnly, async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
        if (!list)
            return res.status(404).json({ error: { alert: "Not Found!" } });

        list = await List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        return res.status(200).json(list);
    } catch (error) {
        const errors = handleErrors(error);
        return res.status(400).json({ error: errors });
    }
});

//Route-3: Deleting an existing list
router.delete('/:id', authenticateAdminOnly, async (req, res) => {
    try {
        let list = await List.findByIdAndDelete(req.params.id);
        if (!list)
            return res.status(404).json({ error: { alert: "Not Found" } });

        return res.status(200).json({ message: { alert: "List has been deleted successfully!" } });
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Route-4: Getting details of existing lists
router.get('/', fetch, async (req, res) => {
    const Qtype = req.query.type;
    const Qgenre = req.query.genre;
    let lists;
    try {
        if (Qtype && Qgenre) {
            lists = await List.aggregate([
                { $match: { type: Qtype, genre: Qgenre } },
                { $sample: { size: 10 } }
            ]);
        }
        else if (Qtype) {
            lists = await List.aggregate([
                { $match: { type: Qtype } },
                { $sample: { size: 10 } }
            ]);
        }
        else {
            lists = await List.aggregate([
                { $sample: { size: 10 } }
            ]);
        }
        return res.status(200).json(lists);
    } catch (error) {
        return res.status(500).json({ error: { alert: error.message } });
    }
});

//Utility Functions
function handleErrors(err) {
    const errors = { title: '', alert: '' };
    if (err.message.includes("Validation failed") || err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.code === 11000)
        errors.alert = "List already exists";

    return errors;
}

module.exports = router;