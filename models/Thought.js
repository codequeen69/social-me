const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction must be less than 280 characters!',
            maxLength: 280
        },
        username:{
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            
        }
    }
);


const ThoughtSchema = new Schema(
    {
    thoughtText:{
        type: String,
        require: 'Must be between one and 280 characters in length!',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now.apply
    },
    username:{
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        virtuals:true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactionCount.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;