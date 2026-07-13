const jwt = require("jsonwebtoken");

// Auth middleware

const protect = async (req, res, next) => {

    let token;
    // Ambil Token dari Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {

            token = req.headers.authorization.split(" ")[1];
            // Verifikasi JWT
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            // Simpan Data User
            req.user = decoded;

            return next();

        }

        catch (error) {

            return res.status(401).json({

                success: false,
                message: "Token tidak valid"

            });

        }

    }
    // Token Tidak Ada
    return res.status(401).json({

        success: false,
        message: "Token tidak ditemukan"

    });

};

module.exports = {
    protect
};