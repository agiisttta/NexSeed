const Simulation = require("../models/Simulation");

// Simpan hasil simulasi

exports.saveSimulation = async (req, res) => {
  try {
    console.log("SAVE SIMULATION");
    console.log("User :", req.user);
    console.log("Body :", JSON.stringify(req.body, null, 2));

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan pada token.",
      });
    }

    const { air, suhu, cahaya, hasil, keterangan } = req.body;

    if (
      air === undefined ||
      suhu === undefined ||
      cahaya === undefined ||
      !hasil
    ) {
      return res.status(400).json({
        success: false,
        message: "Data simulasi tidak lengkap.",
      });
    }

    const simulationData = {
      user: req.user.id,
      air,
      suhu,
      cahaya,
      hasil,
      keterangan: keterangan || "",
    };

    const simulation = await Simulation.create(simulationData);

    console.log("Hasil simulasi berhasil disimpan.");

    return res.status(201).json({
      success: true,
      message: "Hasil simulasi berhasil disimpan.",
      data: simulation,
    });
  } catch (err) {
    console.log("ERROR SAVE SIMULATION");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get riwayat simulasi

exports.getMySimulations = async (req, res) => {
  try {
    const simulations = await Simulation.find({
      user: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    return res.status(200).json({
      success: true,
      total: simulations.length,
      data: simulations,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};