const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createLkpd,
    getMyLkpd,
    getLkpdById,
    updateLkpd,
    deleteLkpd
} = require("../controllers/lkpdController");

// Create lkpd

router.post(
    "/",
    protect,
    createLkpd
);

// Get semua lkpd milik user

router.get(
    "/my",
    protect,
    getMyLkpd
);

// Get detail lkpd

router.get(
    "/:id",
    protect,
    getLkpdById
);

// Update lkpd

router.put(
    "/:id",
    protect,
    updateLkpd
);

// Delete lkpd

router.delete(
    "/:id",
    protect,
    deleteLkpd
);

module.exports = router;