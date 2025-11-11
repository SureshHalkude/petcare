import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  try {
    const newMessage = await Message.create({ fullName, email, phone, message });
    res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
