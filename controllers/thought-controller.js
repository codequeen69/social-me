const { Thought, User } = require('../models');

const thoughtController = {
    addThought({params, body}, res){
        Thought.create(body)
        .then(({_id}) =>{
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: { thoughts: _id}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                re.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
        },

    addReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {replies: body}},
            {new: true}
            )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
     },

     //remove a reaction
     removeReaction({params}, res){
         Thought.findOneAndUpdate(
             {_id: params.commentId},
             {$pull: {reactions: {reactionId: params.reactionId}}},
             {new:true}
         )
         .then(dbUserData =>  res.json(dbUserData))
         .catch(err => res.json(err));
     },

     //remove a thought
     removeThought({params}, res){
         Thought.findOneAndDelete({_id: params.thoughtId})
         .then(deletedThought => {
             if(!deletedComment){
                 return res.status(404).json({message: 'No thought found with this id!'});
             }
             return User.findOneAndUpdate(
                 {_id: params.userId},
                 //MongoDb $pull removes items from an array
                 {$pull: {comments: params.commentId}},
                 {new:true}
             )
         })
         .then(dbUserData => {
             if(!dbUserData){
                 res.status(404).json({message: 'No user found with this id!'});
                 return
             }
             res.json(dbUserData);
         })
         .catch(err => res.json(err));
     }
};

module.exports = thoughtController;
