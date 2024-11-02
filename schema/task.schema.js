const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "moderate", "high"],
    required: true
  },
  assign: { type: String, default: "" },
  category: { type: String, required: true, default: "To-do" },

  checklist: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ],
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", taskSchema);
