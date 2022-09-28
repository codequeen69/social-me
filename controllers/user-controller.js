const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one user
    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found wit this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },


    // deleteUser({params}, res){
    //     User.findOneAndDelete({_id: params.id})
    //     .then(({thoughts_id}) => {
    //         return Thought.findOneAndDelete(
    //             {thoughts_id: this._id},
    //             { $pull: { thoughts_id: this._id } },
    //     { multi: true })  
            
    //     })
    //     .then(dbUserData => {
    //         if(!dbUserData){
    //             res.status(404).json({ message: 'No user found wit this id!'});
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },
    addFriend({ params, body}, res) {
         User.findOneAndUpdate(
             { _id: params.userId },
             { $push: { friends: params.friendId }}, 
             { new: true }
         )
         .populate({
             path:'friends',
             select:'-__v'
         })
         .select('-__v')
              .then(dbUserData => {
                  if (!dbUserData) {
                      res.status(404).json({ message: 'No user found with this id!' });
                      return;
                  }
                  res.json(dbUserData);
              })
              .catch(err => res.status(400).json(err));
     },

     deleteFriend({params}, res){
         User.findOneAndUpdate(
            { _id: params.userId },
            {$pull: { friends: params.friendId}},
            {new: true}
         )
         .populate({
             path: 'friends',
             select: '-__v'
         })
         .select('-__v')
         .then(dbUserData => {
             if(!dbUserData){
                 res.status(404).json({ message: 'No user found with this id!'});
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
     }

};

module.exports = userController;