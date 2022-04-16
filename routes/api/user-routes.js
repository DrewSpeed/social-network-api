const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserById
} = require('../../controllers/user-controller');


router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .get(getUserById);

module.exports = router;