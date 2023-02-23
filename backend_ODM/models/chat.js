const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });



module.exports = model('Chat', chatSchema);