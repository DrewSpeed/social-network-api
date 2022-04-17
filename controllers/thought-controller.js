const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'Incorrect thought data!'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { runValidators: true, new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },
    removeThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!'})
                }
                return User.findOneAndUpdate({ thoughts: params.thoughtId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body }}, { new: true, runValidators: true })
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId }, 
            { 
                $pull: {
                    reactions: { 
                        reactionId: params.reactionId 
                    }
                }
            },
            { new: true })
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No reaction found with this id!'});
                return;
            }
            res.json(thought)
        })
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;
