const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // add a user
    addUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    // get a singler user by the user's id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    //update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with the id given!'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params}, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with the id given!'})
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId }},
            {runValidators: true, new: true}
        )
        .then(userData => {
        if(!userData){
            res.status(404).json({ message: 'No user found with the id given!'});
            return;
        }
        res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true, new: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;