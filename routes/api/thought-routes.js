const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId
router
.route('/:userId')
.post(addThought);

// /api/comments/:userId/:thoughtId
router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);


// /api/:userId/:thoughtId/:reactionId
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;


