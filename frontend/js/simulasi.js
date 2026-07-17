/* =====================================================
   SIMULASI PERKECAMBAHAN BIJI
   NEXSEED
===================================================== */

const BASE_URL = `${CONFIG.API_URL}/api/simulation`;

/* =====================================================
   ELEMENT
===================================================== */

const air = document.getElementById("air");
const temp = document.getElementById("temp");
const light = document.getElementById("light");

const airValue = document.getElementById("airValue");
const tempValue = document.getElementById("tempValue");
const lightValue = document.getElementById("lightValue");

const lightStatus = document.getElementById("lightStatus");
const tempStatus = document.getElementById("tempStatus");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");

const day = document.getElementById("day");
const progressFill = document.getElementById("progressFill");

const plant = document.getElementById("plant");

const status = document.getElementById("status");
const part = document.getElementById("part");

const condition = document.getElementById("condition");
const conditionText = document.getElementById("conditionText");

const description = document.getElementById("description");
const conclusion = document.getElementById("conclusion");

const historyContent = document.getElementById("historyContent");

/* =====================================================
   USER
===================================================== */

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("nama");

/* =====================================================
   AUTH
===================================================== */

function checkAuth() {

    if (!token) {

        alert("Silakan login terlebih dahulu.");

        window.location.href = "login.html";

        return;

    }

}

checkAuth();

/* =====================================================
   VARIABLE
===================================================== */

let timer = null;

let currentDay = 0;

/* =====================================================
   UPDATE SLIDER
===================================================== */

function updateSlider() {

    const airNum = Number(air.value);

    const tempNum = Number(temp.value);

    const lightNum = Number(light.value);

    /* ==========================
       AIR
    ========================== */

    if (airNum < 30) {

        airValue.innerHTML = `${airNum}% (Kering)`;

    }

    else if (airNum <= 75) {

        airValue.innerHTML = `${airNum}% (Optimal)`;

    }

    else {

        airValue.innerHTML = `${airNum}% (Berlebih)`;

    }

    /* ==========================
       SUHU
    ========================== */

    tempValue.innerHTML = `${tempNum}°C`;

    if (tempNum < 15) {

        tempStatus.innerHTML = "❄️ Dingin";

    }

    else if (tempNum <= 35) {

        tempStatus.innerHTML = "🌡️ Optimal";

    }

    else {

        tempStatus.innerHTML = "🔥 Terlalu Panas";

    }

    /* ==========================
       CAHAYA
    ========================== */

    if (lightNum < 50) {

        lightValue.innerHTML = `${lightNum}% (Redup)`;

        lightStatus.innerHTML = "🌙 Redup";

    }

    else {

        lightValue.innerHTML = `${lightNum}% (Terang)`;

        lightStatus.innerHTML = "☀️ Terang";

    }

    updateSky();

}

/* =====================================================
   UPDATE LANGIT
===================================================== */

function updateSky() {

    const sky = document.querySelector(".sky");

    const sun = document.querySelector(".sun");

    if (!sky || !sun) return;

    const value = Number(light.value);

    if (value < 50) {

        sky.style.background =
            "linear-gradient(to bottom,#374151,#6b7280)";

        sun.style.display = "none";

    }

    else {

        sky.style.background =
            "linear-gradient(to bottom,#87CEEB,#D9F3FF)";

        sun.style.display = "block";

    }

}

/* =====================================================
   EVENT SLIDER
===================================================== */

air.addEventListener("input", updateSlider);

temp.addEventListener("input", updateSlider);

light.addEventListener("input", updateSlider);

/* =====================================================
   LOAD PERTAMA
===================================================== */

updateSlider();

/* =====================================================
   RESET TANAMAN
===================================================== */

function clearPlant() {

    plant.className = "";

}

/* =====================================================
   RESET HASIL
===================================================== */

function resetResult() {

    status.innerHTML = "Siap";

    part.innerHTML = "-";

    condition.innerHTML = "🌱 Siap Disimulasikan";

    conditionText.innerHTML =
        "Menunggu simulasi dijalankan.";

    description.innerHTML =
        "Atur kadar air, suhu dan cahaya kemudian tekan tombol Jalankan.";

    conclusion.innerHTML = "-";

}

/* =====================================================
   UPDATE PROGRESS
===================================================== */

function updateProgress(hari) {

    day.innerHTML = hari;

    progressFill.style.width = `${hari * 20}%`;

}

/* =====================================================
   HASIL SIMULASI
===================================================== */

function hasil(a, t, c) {

    clearPlant();

    /* ====================================
       PRIORITAS
       1. SUHU
       2. AIR
       3. CAHAYA
       4. NORMAL
    ==================================== */


    /* ====================================
       SUHU > 35°C
    ==================================== */

    if (t > 35) {

        plant.classList.add("dead");

        status.innerHTML = "🔥 Mati";

        part.innerHTML = "Embrio";

        condition.innerHTML =
            "🔥 Suhu Terlalu Tinggi";

        conditionText.innerHTML =
            "Suhu melebihi batas optimal.";

        description.innerHTML =
            "Enzim mengalami kerusakan sehingga embrio tidak mampu berkembang.";

        conclusion.innerHTML =
            "Benih mati dan gagal berkecambah.";

        return;

    }


    /* ====================================
       AIR < 30%
    ==================================== */

    if (a < 30) {

        plant.classList.add("dry");

        status.innerHTML =
            "🌵 Kering";

        part.innerHTML =
            "Benih";

        condition.innerHTML =
            "💧 Air Terlalu Sedikit";

        conditionText.innerHTML =
            "Benih gagal melakukan imbibisi.";

        description.innerHTML =
            "Air tidak mencukupi untuk mengaktifkan metabolisme embrio.";

        conclusion.innerHTML =
            "Perkecambahan tidak terjadi.";

        return;

    }


    /* ====================================
       AIR > 75%
    ==================================== */

    if (a > 75) {

        plant.classList.add("rotten");

        status.innerHTML =
            "🦠 Membusuk";

        part.innerHTML =
            "Benih";

        condition.innerHTML =
            "💦 Air Berlebihan";

        conditionText.innerHTML =
            "Benih kekurangan oksigen.";

        description.innerHTML =
            "Media terlalu basah sehingga respirasi terganggu dan benih membusuk.";

        conclusion.innerHTML =
            "Perkecambahan gagal.";

        return;

    }


    /* ====================================
       CAHAYA < 50%
    ==================================== */

    if (c < 50) {

        plant.classList.add("dead");

        status.innerHTML =
            "🌑 Mati";

        part.innerHTML =
            "Daun";

        condition.innerHTML =
            "🌙 Cahaya Kurang";

        conditionText.innerHTML =
            "Fotosintesis tidak berlangsung dengan baik.";

        description.innerHTML =
            "Intensitas cahaya terlalu rendah sehingga tanaman tidak mampu menghasilkan energi.";

        conclusion.innerHTML =
            "Tanaman mati.";

        return;

    }


    /* ====================================
       KONDISI OPTIMAL
    ==================================== */

    plant.classList.add("grow");

    status.innerHTML =
        "🌱 Tumbuh Sehat";

    part.innerHTML =
        "Akar, Batang, Daun";

    condition.innerHTML =
        "✅ Kondisi Optimal";

    conditionText.innerHTML =
        "Air, suhu dan cahaya sesuai.";

    description.innerHTML =
        "Benih memperoleh air, suhu dan cahaya yang cukup sehingga proses perkecambahan berlangsung normal.";

    conclusion.innerHTML =
        "Perkecambahan berhasil dengan baik.";

}

/* =====================================================
   JALANKAN SIMULASI
===================================================== */

startBtn.addEventListener("click", () => {

    if (timer) return;

    const nilaiAir = Number(air.value);
    const nilaiTemp = Number(temp.value);
    const nilaiLight = Number(light.value);

    clearPlant();

    hasil(
        nilaiAir,
        nilaiTemp,
        nilaiLight
    );

    currentDay = 0;

    updateProgress(0);

    startBtn.disabled = true;

    startBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Simulasi Berjalan
    `;

    timer = setInterval(() => {

        currentDay++;

        updateProgress(currentDay);

        if (currentDay >= 5) {

            clearInterval(timer);

            timer = null;

            startBtn.disabled = false;

            startBtn.innerHTML = `
                <i class="fa-solid fa-play"></i>
                Jalankan
            `;

            saveBtn.style.display = "flex";

        }

    },1000);

});


/* =====================================================
   RESET SIMULASI
===================================================== */

resetBtn.addEventListener("click",()=>{

    if(timer){

        clearInterval(timer);

        timer = null;

    }

    air.value = 50;

    temp.value = 25;

    light.value = 100;

    updateSlider();

    clearPlant();

    currentDay = 0;

    updateProgress(0);

    resetResult();

    startBtn.disabled = false;

    startBtn.innerHTML = `
        <i class="fa-solid fa-play"></i>
        Jalankan
    `;

    saveBtn.style.display = "none";

});


/* =====================================================
   TOMBOL SIMPAN
===================================================== */

saveBtn.addEventListener("click",async()=>{

    const originalText = saveBtn.innerHTML;

    saveBtn.disabled = true;

    saveBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Menyimpan...
    `;

    await saveSimulationResult(

        Number(air.value),

        Number(temp.value),

        Number(light.value),

        status.innerHTML,

        conditionText.innerHTML

    );

    saveBtn.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Berhasil
    `;

    setTimeout(()=>{

        saveBtn.disabled = false;

        saveBtn.style.display = "none";

        saveBtn.innerHTML = originalText;

    },2000);

});


/* =====================================================
   LOAD PERTAMA
===================================================== */

updateSlider();

updateProgress(0);

resetResult();

loadHistory();

/* =====================================================
   SIMPAN HASIL SIMULASI
===================================================== */

async function saveSimulationResult(
    airValue,
    suhuValue,
    cahayaValue,
    hasilText,
    keteranganText
){

    try{

        const response = await fetch(
            `${BASE_URL}/save`,
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },

                body:JSON.stringify({

                    air:airValue,

                    suhu:suhuValue,

                    cahaya:cahayaValue,

                    hasil:hasilText,

                    keterangan:keteranganText

                })

            }
        );

        const data = await response.json();

        if(!response.ok){

            throw new Error(data.message);

        }

        loadHistory();

    }

    catch(error){

        console.error(error);

        alert("Gagal menyimpan hasil simulasi.");

    }

}


/* =====================================================
   LOAD RIWAYAT
===================================================== */

async function loadHistory() {

    historyContent.innerHTML = `

        <p class="history-loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Memuat Riwayat...

        </p>

    `;

    try {

        const response = await fetch(

            `${BASE_URL}/history`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        if (!result.success) {

            throw new Error(result.message);

        }

        if (result.data.length === 0) {

            historyContent.innerHTML = `

                <p class="history-loading">

                    Belum ada riwayat simulasi.

                </p>

            `;

            return;

        }

        historyContent.innerHTML = result.data.map((item, index) => `

            <div class="history-card">

                <div class="history-number">

                    #${index + 1}

                </div>

                <div class="history-detail">

                    <div class="history-date">

                        <i class="fa-solid fa-calendar"></i>

                        ${new Date(item.createdAt).toLocaleDateString("id-ID", {

                            day: "numeric",

                            month: "long",

                            year: "numeric"

                        })}

                        &nbsp;&mdash;&nbsp;

                        ${new Date(item.createdAt).toLocaleTimeString("id-ID", {

                            hour: "2-digit",

                            minute: "2-digit"

                        })}

                    </div>

                    <div class="history-info">

                        💧 Air :
                        <b>${item.air}%</b>

                        &nbsp;&nbsp;|&nbsp;&nbsp;

                        🌡️ Suhu :
                        <b>${item.suhu}°C</b>

                        &nbsp;&nbsp;|&nbsp;&nbsp;

                        ☀️ Cahaya :
                        <b>${item.cahaya}%</b>

                    </div>

                    <div class="history-status">

                        🌱 Status :

                        <b>${item.hasil}</b>

                    </div>

                </div>

            </div>

        `).join("");

    }

    catch (error) {

        console.error(error);

        historyContent.innerHTML = `

            <p class="history-loading">

                Gagal memuat riwayat.

            </p>

        `;

    }

}