const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //needs to match the 'user' model in user.js
    }

},
    {
        timestamps: true
    }
)

//this makes sure that the message and its id is removed from the user
messageSchema.pre('remove', async function(next){
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch(err) {
        return next(err)
    }
})

const Message = mongoose.model("Message", messageSchema)
module.exports = Message;