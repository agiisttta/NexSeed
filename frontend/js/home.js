/* =====================================================
   HOME.JS
   NEXSEED
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const isLogin = await checkLogin();

    if (!isLogin) return;

    loadProgress();

    loadStatistic();

    initLogout();

});


// Cek login & load profile

async function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Silakan login terlebih dahulu.");

        window.location.href = "login.html";

        return false;

    }

    try {

        const response = await fetch(
            "http://localhost:5001/api/user/profile",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        loadUser(data.user);

        return true;

    }

    catch (error) {

        console.error(error);

        alert("Session telah berakhir. Silakan login kembali.");

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("nama");
        localStorage.removeItem("email");

        window.location.href = "login.html";

        return false;

    }

}


// Load user

function loadUser(user) {

    const navbar =
        document.getElementById("username");

    const hero =
        document.getElementById("heroUsername");

    if (navbar) {

        navbar.textContent = user.nama;

    }

    if (hero) {

        hero.textContent = user.nama;

    }

}


// Set progress

function setProgress(id, value) {

    const bar = document.getElementById(id);

    if (!bar) return;

    bar.style.transition = "width .8s ease";

    bar.style.width = `${value}%`;

}


// Load progress

function loadProgress() {

    const lkpd =
        Number(sessionStorage.getItem("progressLKPD")) || 0;

    const simulasi =
        Number(sessionStorage.getItem("progressSimulation")) || 0;

    const quiz =
        Number(sessionStorage.getItem("progressQuiz")) || 0;

    setProgress("progressLKPD", lkpd);
    setProgress("progressSimulation", simulasi);
    setProgress("progressQuiz", quiz);

    const lkpdText =
        document.getElementById("lkpdPercent");

    const simulationText =
        document.getElementById("simulationPercent");

    const quizText =
        document.getElementById("quizPercent");

    if (lkpdText)
        lkpdText.textContent = `${lkpd}%`;

    if (simulationText)
        simulationText.textContent = `${simulasi}%`;

    if (quizText)
        quizText.textContent = `${quiz}%`;

}


// Load statistik

function loadStatistic() {

    const lkpd =
        Number(sessionStorage.getItem("progressLKPD")) || 0;

    const simulasi =
        Number(sessionStorage.getItem("progressSimulation")) || 0;

    const quiz =
        Number(sessionStorage.getItem("progressQuiz")) || 0;

    const materi =
        document.getElementById("materiCount");

    const simulation =
        document.getElementById("simulationCount");

    const quizCount =
        document.getElementById("quizCount");

    const point =
        document.getElementById("pointCount");

    if (materi) {

        materi.textContent =
            `${Math.round(lkpd / 20)} / 5`;

    }

    if (simulation) {

        simulation.textContent =
            Math.round(simulasi / 20);

    }

    if (quizCount) {

        quizCount.textContent =
            `${Math.round(quiz / 10)} / 10`;

    }

    if (point) {

        point.textContent =
            Math.round((lkpd + simulasi + quiz) / 3);

    }

}


// Logout

function initLogout() {

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Apakah Anda yakin ingin logout?");

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("nama");
        localStorage.removeItem("email");

        sessionStorage.clear();

        alert("Logout berhasil.");

        window.location.href = "login.html";

    });

}