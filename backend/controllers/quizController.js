const Quiz = require("../models/Quiz");

// Submit quiz

exports.submitQuiz = async (req, res) => {
  try {
    console.log("SUBMIT QUIZ");
    console.log("User :", req.user);
    console.log("Body :", JSON.stringify(req.body, null, 2));

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan pada token.",
      });
    }

    const { answers, score, correct, wrong, grade } = req.body;

    if (
      answers === undefined ||
      score === undefined ||
      correct === undefined ||
      wrong === undefined ||
      !grade
    ) {
      return res.status(400).json({
        success: false,
        message: "Data quiz tidak lengkap.",
      });
    }

    const quiz = await Quiz.create({
      user: req.user.id,
      answers,
      score,
      correct,
      wrong,
      grade,
    });

    console.log("Quiz berhasil disimpan.");

    return res.status(201).json({
      success: true,
      message: "Hasil quiz berhasil disimpan.",
      data: quiz,
    });
  } catch (err) {
    console.log("ERROR SUBMIT QUIZ");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get riwayat quiz

exports.getMyQuizHistory = async (req, res) => {
  try {
    const data = await Quiz.find({
      user: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    return res.status(200).json({
      success: true,
      total: data.length,
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
