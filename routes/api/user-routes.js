
const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


//set the Get all and Post at /api/users
router
.route('/')
.get(getAllUser)
.post(createUser)

//set GET one, PUT, and DELETE at /api/user/:id

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);


// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;