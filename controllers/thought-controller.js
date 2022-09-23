const { Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res){
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
    }
}