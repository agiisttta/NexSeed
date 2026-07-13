/* =====================================================
   REGISTER.JS
   NEXSEED
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initRegister();

    initPasswordToggle(
        "password",
        "togglePassword"
    );

    initPasswordToggle(
        "confirmPassword",
        "toggleConfirmPassword"
    );

});


// Register function

function initRegister() {

    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nama = document
            .getElementById("nama")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("password")
            .value;

        const confirmPassword = document
            .getElementById("confirmPassword")
            .value;

        const registerBtn = document.getElementById("registerBtn");

        // Validasi input

        if (
            nama === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Semua data harus diisi.");

            return;

        }

        // Validasi email

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Format email tidak valid.");

            return;

        }

        // Validasi password

        if (password.length < 6) {

            alert("Password minimal 6 karakter.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Konfirmasi password tidak sama.");

            return;

        }

        // Loading button

        registerBtn.disabled = true;

        registerBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Mendaftarkan...
        `;

        // Kirim data ke backend

        try {

            const response = await fetch(
                `${CONFIG.API_URL}/api/auth/register`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        nama,
                        email,
                        password

                    })

                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                registerBtn.disabled = false;

                registerBtn.innerHTML = `
                    <i class="fa-solid fa-user-plus"></i>
                    Daftar
                `;

                return;

            }

            alert("Registrasi berhasil!");

            window.location.href = "login.html";

        }

        catch (error) {

            console.error(error);

            alert("Tidak dapat terhubung ke server.");

            registerBtn.disabled = false;

            registerBtn.innerHTML = `
                <i class="fa-solid fa-user-plus"></i>
                Daftar
            `;

        }

    });

}


// Show / hide password

function initPasswordToggle(inputId, eyeId) {

    const input = document.getElementById(inputId);

    const eye = document.getElementById(eyeId);

    if (!input || !eye) return;

    eye.addEventListener("click", () => {

        if (input.type === "password") {

            input.type = "text";

            eye.classList.remove("fa-eye");

            eye.classList.add("fa-eye-slash");

        }

        else {

            input.type = "password";

            eye.classList.remove("fa-eye-slash");

            eye.classList.add("fa-eye");

        }

    });

}