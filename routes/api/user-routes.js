const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserById,
    updateUser
} = require('../../controllers/user-controller');


router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser);

module.exports = router;