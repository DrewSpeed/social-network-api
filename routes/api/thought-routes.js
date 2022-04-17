const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getThoughts);

router.route('/:userId')
    .post(addThought);

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);


module.exports = router;
