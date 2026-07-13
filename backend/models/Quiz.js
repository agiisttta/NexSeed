const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: {
      type: Object,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    correct: {
      type: Number,
      required: true,
    },

    wrong: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Quiz", quizSchema);
