const Lkpd = require("../models/Lkpd");

// Create lkpd

exports.createLkpd = async (req, res) => {
  try {
    console.log("CREATE LKPD");
    console.log("User :", req.user);
    console.log("Body :", JSON.stringify(req.body, null, 2));

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan pada token.",
      });
    }

    const data = {
      ...req.body,
      user: req.user.id,
    };

    const lkpd = await Lkpd.create(data);

    console.log("LKPD berhasil dibuat.");

    return res.status(201).json({
      success: true,
      message: "LKPD berhasil disimpan.",
      data: lkpd,
    });
  } catch (err) {
    console.log("ERROR CREATE");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get my lkpd

exports.getMyLkpd = async (req, res) => {
  try {
    const data = await Lkpd.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

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

// Get detail lkpd

exports.getLkpdById = async (req, res) => {
  try {
    const lkpd = await Lkpd.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!lkpd) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: lkpd,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update lkpd

exports.updateLkpd = async (req, res) => {
  try {
    const lkpd = await Lkpd.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },

      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!lkpd) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LKPD berhasil diperbarui.",
      data: lkpd,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete lkpd

exports.deleteLkpd = async (req, res) => {
  try {
    const lkpd = await Lkpd.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!lkpd) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LKPD berhasil dihapus.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
