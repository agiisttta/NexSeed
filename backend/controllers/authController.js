const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register

exports.register = async (req, res) => {

    try {

        const { nama, email, password } = req.body;

        // cek email sudah ada atau belum
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "Email sudah digunakan"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // simpan user
        const user = await User.create({
            nama,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Register berhasil",
            user: {
                id: user._id,
                nama: user.nama,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Login

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Email tidak ditemukan"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Password salah"
            });

        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({

            message: "Login berhasil",

            token,

            user: {

                id: user._id,
                nama: user.nama,
                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};