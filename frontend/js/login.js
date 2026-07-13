/* =====================================================
   LOGIN.JS
   NEXSEED
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initLogin();

    togglePassword();

});


// Login function

function initLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("password")
            .value;

        const remember =
            document.getElementById("rememberMe");

        const loginBtn =
            document.getElementById("loginBtn");

        // Validasi input

        if (email === "" || password === "") {

            alert("Email dan Password wajib diisi.");

            return;

        }

        // Validasi email

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Format email tidak valid.");

            return;

        }

        // Loading button

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sedang Login...
        `;

        // Request login

        try {

            const response = await fetch(
                `${CONFIG.API_URL}/api/auth/login`
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        email,
                        password

                    })

                }
            );

            const data = await response.json();

            // Login gagal

            if (!response.ok) {

                alert(data.message || "Login gagal.");

                loginBtn.disabled = false;

                loginBtn.innerHTML = `
                    <i class="fa-solid fa-right-to-bracket"></i>
                    Login
                `;

                return;

            }

            // Simpan token

            localStorage.setItem(
                "token",
                data.token
            );

            // Simpan data user

            localStorage.setItem(
                "userId",
                data.user.id
            );

            localStorage.setItem(
                "nama",
                data.user.nama
            );

            localStorage.setItem(
                "email",
                data.user.email
            );

            // Remember email

            if (remember.checked) {

                localStorage.setItem(
                    "rememberEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "rememberEmail"
                );

            }

            // Login berhasil

            alert("Login berhasil.");

            window.location.href =
                "home.html";

        }

        catch (error) {

            console.error(error);

            alert(
                "Tidak dapat terhubung ke server."
            );

            loginBtn.disabled = false;

            loginBtn.innerHTML = `
                <i class="fa-solid fa-right-to-bracket"></i>
                Login
            `;

        }

    });


    // Auto load email

    const savedEmail =
        localStorage.getItem(
            "rememberEmail"
        );

    const emailInput =
        document.getElementById("email");

    const remember =
        document.getElementById("rememberMe");

    if (
        savedEmail &&
        emailInput &&
        remember
    ) {

        emailInput.value = savedEmail;

        remember.checked = true;

    }

}


// Show / hide password

function togglePassword() {

    const password =
        document.getElementById(
            "password"
        );

    const eye =
        document.getElementById(
            "togglePassword"
        );

    if (!password || !eye) return;

    eye.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            eye.classList.remove("fa-eye");

            eye.classList.add("fa-eye-slash");

        }

        else {

            password.type = "password";

            eye.classList.remove("fa-eye-slash");

            eye.classList.add("fa-eye");

        }

    });

}