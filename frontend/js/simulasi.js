/* =====================================================
   SIMULASI PERKECAMBAHAN BIJI
   NEXSEED
===================================================== */

// Element

const BASE_URL = "http://localhost:3000/api";

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

let userId = localStorage.getItem("userId");
let username = localStorage.getItem("username");
let token = localStorage.getItem("token");

// Cek autentikasi pengguna
function checkAuth() {
  if (!token) {
    window.location.href = "login.html";
  }
}

checkAuth();

// Variable

let timer = null;

let currentDay = 0;

// Update slider

function updateSlider() {
  let airNum = Number(air.value);

  let tempNum = Number(temp.value);

  let lightNum = Number(light.value);

  // Air

  if (airNum <= 30) {
    airValue.innerHTML = airNum + "% (Kering)";
  } else if (airNum <= 70) {
    airValue.innerHTML = airNum + "% (Optimal)";
  } else {
    airValue.innerHTML = airNum + "% (Berlebih)";
  }

  // Suhu

  tempValue.innerHTML = tempNum + "°C";

  if (tempNum <= 10) {
    tempStatus.innerHTML = "❄️ Dingin";
  } else if (tempNum <= 40) {
    tempStatus.innerHTML = "🌡️ Normal";
  } else {
    tempStatus.innerHTML = "🔥 Panas";
  }

  // Cahaya

  if (lightNum <= 30) {
    lightValue.innerHTML = lightNum + "% (Gelap)";
  } else if (lightNum <= 70) {
    lightValue.innerHTML = lightNum + "% (Redup)";
  } else {
    lightValue.innerHTML = lightNum + "% (Terang)";
  }

  updateSky();
}

// Update langit

function updateSky() {
  const sky = document.querySelector(".sky");

  const sun = document.querySelector(".sun");

  if (!sky || !sun) return;

  let value = Number(light.value);

  if (value <= 30) {
    sky.style.background = "linear-gradient(to bottom,#1d3557,#34495e)";

    sun.style.display = "none";
  } else if (value <= 70) {
    sky.style.background = "linear-gradient(to bottom,#9ecae1,#d9edf7)";

    sun.style.display = "block";
  } else {
    sky.style.background = "linear-gradient(to bottom,#87ceeb,#d9f3ff)";

    sun.style.display = "block";
  }
}

// Event slider

air.addEventListener("input", updateSlider);

temp.addEventListener("input", updateSlider);

light.addEventListener("input", updateSlider);

// Load awal

updateSlider();

// Reset class tanaman

function clearPlant() {
  plant.className = "";
}

// Reset hasil

function resetResult() {
  status.innerHTML = "Siap";

  part.innerHTML = "-";

  condition.innerHTML = "🌱 Siap disimulasikan";

  conditionText.innerHTML = "Menunggu simulasi dijalankan.";

  description.innerHTML =
    "Atur kadar air, suhu, dan intensitas cahaya kemudian tekan tombol Jalankan.";

  conclusion.innerHTML = "-";
}

// Update progress

function updateProgress(hari) {
  day.innerHTML = hari;

  progressFill.style.width = hari * 20 + "%";
}

// Hasil simulasi

function hasil(a, t, c) {
  clearPlant();

  /*
        PRIORITAS:
        1. Suhu ekstrem
        2. Air ekstrem
        3. Cahaya
        4. Optimal
    */

  // Suhu terlalu dingin

  if (t === 0) {
    plant.classList.add("dormant");

    status.innerHTML = "❄️ Dormansi";

    part.innerHTML = "-";

    condition.innerHTML = "❄️ Suhu Terlalu Rendah";

    conditionText.innerHTML = "Aktivitas metabolisme benih berhenti sementara.";

    description.innerHTML =
      "Suhu rendah menyebabkan kerja enzim terhambat sehingga proses perkecambahan tidak berlangsung.";

    conclusion.innerHTML =
      "Benih tetap hidup tetapi tidak mengalami pertumbuhan.";

    return;
  }

  // Suhu terlalu panas

  if (t === 50) {
    plant.classList.add("dead");

    status.innerHTML = "🔥 Mati";

    part.innerHTML = "Embrio";

    condition.innerHTML = "🔥 Suhu Terlalu Tinggi";

    conditionText.innerHTML = "Jaringan embrio mengalami kerusakan.";

    description.innerHTML =
      "Suhu ekstrem menyebabkan denaturasi protein dan enzim sehingga sel tidak mampu berkembang.";

    conclusion.innerHTML = "Perkecambahan gagal.";

    return;
  }

  // Air kering

  if (a === 0) {
    plant.classList.add("dry");

    status.innerHTML = "❌ Tidak Berkecambah";

    part.innerHTML = "-";

    condition.innerHTML = "🌵 Kekurangan Air";

    conditionText.innerHTML = "Benih tidak mengalami proses imbibisi.";

    description.innerHTML =
      "Air dibutuhkan untuk mengaktifkan enzim dan memulai metabolisme embrio.";

    conclusion.innerHTML = "Perkecambahan gagal karena kekurangan air.";

    return;
  }

  // Air berlebihan

  if (a === 100) {
    plant.classList.add("rotten");

    status.innerHTML = "🦠 Benih Busuk";

    part.innerHTML = "Benih";

    condition.innerHTML = "💧 Air Berlebihan";

    conditionText.innerHTML =
      "Benih kekurangan oksigen akibat tanah terlalu basah.";

    description.innerHTML =
      "Kelebihan air menghambat respirasi sehingga benih mudah mengalami pembusukan.";

    conclusion.innerHTML = "Perkecambahan gagal.";

    return;
  }

  // Cahaya gelap

  if (c === 0) {
    plant.classList.add("etiolation");

    status.innerHTML = "🌱 Etiolasi";

    part.innerHTML = "Batang";

    condition.innerHTML = "🌙 Kekurangan Cahaya";

    conditionText.innerHTML =
      "Batang tumbuh panjang tetapi daun kecil dan pucat.";

    description.innerHTML =
      "Tanaman mengalami etiolasi karena kekurangan cahaya untuk pembentukan klorofil.";

    conclusion.innerHTML = "Tanaman hidup tetapi pertumbuhan tidak normal.";

    return;
  }

  // Cahaya redup

  if (c === 50) {
    plant.classList.add("grow");

    status.innerHTML = "🌿 Tumbuh";

    part.innerHTML = "Radikula";

    condition.innerHTML = "⛅ Pertumbuhan Sedang";

    conditionText.innerHTML = "Kecambah mulai berkembang namun belum maksimal.";

    description.innerHTML =
      "Fotosintesis berlangsung tetapi energi cahaya masih terbatas.";

    conclusion.innerHTML = "Perkecambahan berhasil tetapi kurang optimal.";

    return;
  }

  // Kondisi ideal

  plant.classList.add("grow");

  status.innerHTML = "🌱 Tumbuh Sehat";

  part.innerHTML = "Akar, Batang, dan Daun";

  condition.innerHTML = "✅ Kondisi Optimal";

  conditionText.innerHTML = "Akar, batang, dan daun berkembang dengan baik.";

  description.innerHTML =
    "Air, suhu, dan cahaya berada pada kondisi ideal sehingga proses perkecambahan berjalan optimal.";

  conclusion.innerHTML = "Perkecambahan berhasil dengan baik.";
}

// Jalankan simulasi

startBtn.addEventListener("click", function () {
  // Jika masih berjalan
  if (timer) {
    return;
  }

  const nilaiAir = Number(air.value);

  const nilaiTemp = Number(temp.value);

  const nilaiLight = Number(light.value);

  // Bersihkan tanaman sebelumnya

  clearPlant();

  // Tampilkan hasil kondisi

  hasil(nilaiAir, nilaiTemp, nilaiLight);

  currentDay = 0;

  updateProgress(0);

  startBtn.disabled = true;

  startBtn.innerHTML = `

    <i class="fa-solid fa-spinner fa-spin"></i>

    Simulasi Berjalan

    `;

  // Simulasi 5 hari

  timer = setInterval(function () {
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
            
      // Tampilkan tombol simpan setelah simulasi selesai
      saveBtn.style.display = "flex";
    }
  }, 1000);
});

// Reset simulasi

resetBtn.addEventListener("click", function () {
  // Hentikan timer

  if (timer) {
    clearInterval(timer);

    timer = null;
  }

  // Kembalikan slider

  air.value = 50;

  temp.value = 25;

  light.value = 100;

  // Update tampilan slider

  updateSlider();

  // Reset tanaman

  clearPlant();

  // Reset progress

  currentDay = 0;

  updateProgress(0);

  // Reset hasil

  resetResult();

  // Aktifkan tombol

  startBtn.disabled = false;

  startBtn.innerHTML = `


    <i class="fa-solid fa-play"></i>


    Jalankan


    `;
    
  // Sembunyikan tombol simpan saat di-reset
  saveBtn.style.display = "none";
});

// Initial load

updateSlider();

updateProgress(0);

resetResult();

loadHistory();

// Event listener untuk tombol simpan
saveBtn.addEventListener("click", async () => {
  const originalText = saveBtn.innerHTML;
  saveBtn.disabled = true;
  saveBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...`;

  const nilaiAir = Number(air.value);
  const nilaiTemp = Number(temp.value);
  const nilaiLight = Number(light.value);
  const statusText = status.innerHTML;
  const conditionStr = conditionText.innerHTML;

  await saveSimulationResult(nilaiAir, nilaiTemp, nilaiLight, statusText, conditionStr);

  saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> Tersimpan`;
  setTimeout(() => {
    saveBtn.disabled = false;
    saveBtn.innerHTML = originalText;
    saveBtn.style.display = "none"; // Sembunyikan setelah berhasil menyimpan
  }, 2000);
});

// Save simulation result to backend
async function saveSimulationResult(
  water,
  temperature,
  light,
  resultText,
  description,
) {
  try {
    const response = await fetch(`http://localhost:5001/api/simulation/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        air: water,
        suhu: temperature,
        cahaya: light,
        hasil: resultText,
        keterangan: description,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Simulation result saved:", data);
      loadHistory(); // Reload history after saving
    } else {
      console.error("Failed to save simulation result:", data.message);
    }
  } catch (error) {
    console.error("Error saving simulation result:", error);
  }
}

// Load simulation history
async function loadHistory() {
  historyContent.innerHTML = `<p class="history-loading"><i class="fa-solid fa-spinner fa-spin"></i> Memuat riwayat...</p>`;
  try {
    const response = await fetch(`http://localhost:5001/api/simulation/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success) {
      if (data.data.length === 0) {
        historyContent.innerHTML = `<p class="history-loading">Belum ada riwayat simulasi.</p>`;
        return;
      }

      historyContent.innerHTML = `
                <div class="history-list">
                    ${data.data
                      .map(
                        (item, index) => `
                        <div class="history-item" style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid var(--primary); display: flex; align-items: flex-start; gap: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                            <span class="history-rank" style="font-weight: 700; color: var(--primary); font-size: 1.1rem; min-width: 25px;">${index + 1}.</span>
                            <div class="history-info" style="display: flex; flex-direction: column; gap: 5px; width: 100%;">
                                <span class="history-date" style="color: #6c757d; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                                    <i class="fa-solid fa-calendar-days"></i>
                                    ${new Date(item.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </span>
                                <span class="history-detail" style="font-size: 0.95rem;">
                                    Kondisi: <b>Air ${item.air}, Suhu ${item.suhu}, Cahaya ${item.cahaya}</b>
                                </span>
                                <span class="history-detail" style="font-size: 0.95rem;">
                                    Status: <b>${item.hasil}</b>
                                </span>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `;
    } else {
      historyContent.innerHTML = `<p class="history-loading">Gagal memuat riwayat</p>`;
      console.error("Failed to load history:", data.message);
    }
  } catch (error) {
    historyContent.innerHTML = `<p class="history-loading">Error memuat riwayat.</p>`;
    console.error("Error loading history:", error);
  }
}
