const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');


router.route('/')
    .get(getUsers)
    .post(addUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;