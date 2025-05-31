import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";

//getAllUsers is a function that returns all the users
export const getAllUsers = async (req, res, next) => {
  try {
    //get the current user from clerk using the req.auth.userId
    const currentUser = await req.auth.userId;

    //find all the users except the current user
    //and store them in the users variable
    //$ne means not equal to
    const users = await User.find({ clerkId: { $ne: currentUser } });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//getMessages is a function that returns all the messages
export const getMessages = async (req, res, next) => {
  try {
    //get the current user from clerk using the req.auth.userId
    const myId = req.auth.userId;
    //get the id of the user from the request
    const { userId } = req.params;

    //find all the messages between the current user and the user
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
      //sort the messages by createdAt
    }).sort({ createdAt: 1 });

    //return the messages
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
