import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // senderId is the clerk id of the user who sent the message
    senderId: {
        type: String,
        required: true
    },
    // receiverId is the clerk id of the user who received the message
    receiverId: {
        type: String,
        required: true
    },
    // content is the content of the message
    content: {
        type: String,
        required: true
    }
}, 
{timestamps: true});

export const Message = mongoose.model("Message", messageSchema);