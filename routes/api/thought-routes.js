const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    deleteReaction,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.get(getAllThoughts);

// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router
.route('/:thoughtId/reaction')
.post(addReaction); 

// /api/thoughts/:userId
router
.route('/:userId')
.post(addThought);

// /api/thoughts/:thoughtId/reaction/:reactionId
router
.route('/:thoughtId/reaction/:reactionId')
.delete(deleteReaction);

module.exports = router;


