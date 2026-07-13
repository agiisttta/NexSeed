const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    air: {

        type: Number,

        required: true

    },

    suhu: {

        type: Number,

        required: true

    },

    cahaya: {

        type: Number,

        required: true

    },

    hasil: {

        type: String,

        required: true

    },

    keterangan: {

        type: String,

        default: ""

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "Simulation",
    simulationSchema
);