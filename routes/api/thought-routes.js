const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getThoughts);

router.route('/:userId')
    .post(addThought);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);


module.exports = router;
