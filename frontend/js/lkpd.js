/* =====================================================
   LKPD.JS
   NexSeed
   MongoDB Version
===================================================== */

const API_URL = "http://localhost:5001/api/lkpd";

let token = localStorage.getItem("token");
let currentLkpd = null;

// Dom loaded

document.addEventListener("DOMContentLoaded", async () => {
  checkLogin();

  loadUser();

  setToday();

  initButton();

  await loadLkpd();

  await loadSimulationHistory();
});

// Fill form

function fillForm(data) {
  if (!data) return;

  // Identitas

  if (data.identitas) {
    document.getElementById("nama").value = data.identitas.nama || "";

    document.getElementById("kelas").value = data.identitas.kelas || "";

    document.getElementById("kelompok").value = data.identitas.kelompok || "";

    if (data.identitas.tanggal) {
      document.getElementById("tanggal").value =
        data.identitas.tanggal.substring(0, 10);
    }
  }

  // Rumusan masalah

  if (data.rumusanMasalah) {
    document.getElementById("rumusan1").value =
      data.rumusanMasalah.rumusan1 || "";

    document.getElementById("rumusan2").value =
      data.rumusanMasalah.rumusan2 || "";

    document.getElementById("rumusan3").value =
      data.rumusanMasalah.rumusan3 || "";
  }

  // Hipotesis

  if (data.hipotesis) {
    document.getElementById("hipotesis1").value =
      data.hipotesis.hipotesis1 || "";

    document.getElementById("hipotesis2").value =
      data.hipotesis.hipotesis2 || "";

    document.getElementById("hipotesis3").value =
      data.hipotesis.hipotesis3 || "";
  }

  // Tabel pengamatan

  fillObservationTable(data.tabelPengamatan || []);

  // Struktur biji

  if (data.strukturBiji) {
    document.getElementById("strukturA").value = data.strukturBiji.A || "";

    document.getElementById("strukturB").value = data.strukturBiji.B || "";

    document.getElementById("strukturC").value = data.strukturBiji.C || "";

    document.getElementById("strukturD").value = data.strukturBiji.D || "";
  }

  // Fungsi struktur biji

  if (data.fungsiStruktur) {
    document.getElementById("namaBagian1").value = data.fungsiStruktur.namaA || "";

    document.getElementById("fungsi1").value =
      data.fungsiStruktur.fungsiA || "";

    document.getElementById("namaBagian2").value = data.fungsiStruktur.namaB || "";

    document.getElementById("fungsi2").value =
      data.fungsiStruktur.fungsiB || "";

    document.getElementById("namaBagian3").value = data.fungsiStruktur.namaC || "";

    document.getElementById("fungsi3").value =
      data.fungsiStruktur.fungsiC || "";

    document.getElementById("namaBagian4").value = data.fungsiStruktur.namaD || "";

    document.getElementById("fungsi4").value =
      data.fungsiStruktur.fungsiD || "";
  }

  // Analisis

  if (data.analisis) {
    document.getElementById("analisis1").value = data.analisis.analisis1 || "";

    document.getElementById("analisis2").value = data.analisis.analisis2 || "";

    document.getElementById("analisis3").value = data.analisis.analisis3 || "";
  }

  // Kesimpulan

  document.getElementById("kesimpulan").value = data.kesimpulan || "";

  // Hal menarik

  const halMenarik = document.getElementById("halMenarik");

  if (halMenarik) {
    halMenarik.value = data.halMenarik || "";
  }
}

// Get observation table

function getObservationTable() {
  const rows = [];

  for (let i = 1; i <= 5; i++) {
    rows.push({
      percobaan: i,

      air: document.getElementById(`air${i}`)?.value || "",

      suhu: document.getElementById(`suhu${i}`)?.value || "",

      cahaya: document.getElementById(`cahaya${i}`)?.value || "",

      hasil: document.getElementById(`hasil${i}`)?.value || "",
    });
  }

  return rows;
}

// Get form data

function getFormData() {
  return {
    identitas: {
      nama: document.getElementById("nama").value,

      kelas: document.getElementById("kelas").value,

      kelompok: document.getElementById("kelompok").value,

      tanggal: document.getElementById("tanggal").value,
    },

    rumusanMasalah: {
      rumusan1: document.getElementById("rumusan1").value,

      rumusan2: document.getElementById("rumusan2").value,

      rumusan3: document.getElementById("rumusan3").value,
    },

    hipotesis: {
      hipotesis1: document.getElementById("hipotesis1").value,

      hipotesis2: document.getElementById("hipotesis2").value,

      hipotesis3: document.getElementById("hipotesis3").value,
    },

    tabelPengamatan: getObservationTable(),

    strukturBiji: {
      A: document.getElementById("strukturA").value,

      B: document.getElementById("strukturB").value,

      C: document.getElementById("strukturC").value,

      D: document.getElementById("strukturD").value,
    },

    fungsiStruktur: {
      namaA: document.getElementById("namaBagian1").value,

      fungsiA: document.getElementById("fungsi1").value,

      namaB: document.getElementById("namaBagian2").value,

      fungsiB: document.getElementById("fungsi2").value,

      namaC: document.getElementById("namaBagian3").value,

      fungsiC: document.getElementById("fungsi3").value,

      namaD: document.getElementById("namaBagian4").value,

      fungsiD: document.getElementById("fungsi4").value,
    },

    analisis: {
      analisis1: document.getElementById("analisis1").value,

      analisis2: document.getElementById("analisis2").value,

      analisis3: document.getElementById("analisis3").value,
    },

    kesimpulan: document.getElementById("kesimpulan").value,

    halMenarik: document.getElementById("halMenarik")?.value || "",

    status: "draft",
  };
}

// Simpan lkpd

async function saveLkpd() {
  console.log("Tombol Simpan diklik");

  try {
    console.log("Masuk saveLkpd");

    const saveBtn = document.getElementById("saveBtn");

    if (saveBtn) {
      saveBtn.disabled = true;

      saveBtn.innerHTML = "Menyimpan...";
    }

    const data = getFormData();

    console.log(data);

    if (currentLkpd) {
      console.log("UPDATE");

      await updateLkpd(data);
    } else {
      console.log("CREATE");

      await createLkpd(data);
    }
  } catch (err) {
    console.error(err);
  }
}

// Logout

function logout() {
  const konfirmasi = confirm("Apakah Anda yakin ingin logout?");

  if (!konfirmasi) {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("nama");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");

  window.location.href = "login.html";
}

// Get value

function getValue(id) {
  const element = document.getElementById(id);

  return element ? element.value : "";
}

// Load riwayat simulasi ke tabel pengamatan

async function loadSimulationHistory() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) return;

  try {
    const response = await fetch(
      `http://localhost:5001/api/simulation/history`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (data.success && data.data.length > 0) {
      // Ambil 5 simulasi terakhir
      const recentSimulations = data.data.slice(0, 5);

      recentSimulations.forEach((sim, index) => {
        const rowNum = index + 1;

        // Cek apakah elemen ada sebelum mengisi
        const airInput = document.getElementById(`air${rowNum}`);
        const suhuInput = document.getElementById(`suhu${rowNum}`);
        const cahayaInput = document.getElementById(`cahaya${rowNum}`);
        const hasilInput = document.getElementById(`hasil${rowNum}`);

        if (airInput) airInput.value = sim.air || "";
        if (suhuInput) suhuInput.value = sim.suhu || "";
        if (cahayaInput) cahayaInput.value = sim.cahaya || "";
        if (hasilInput) hasilInput.value = sim.hasil || "";
      });
    }
  } catch (error) {
    console.error("Error loading simulation history:", error);
  }
}

// Missing functions

function checkLogin() {
  if (!token) {
    window.location.href = "login.html";
  }
}

function loadUser() {
  const username = localStorage.getItem("nama");
  if (username) {
    document.getElementById("username").innerText = username;
  }
}

function setToday() {
  const tgl = document.getElementById("tanggal");
  if (tgl && !tgl.value) {
    tgl.value = new Date().toISOString().split("T")[0];
  }
}

function initButton() {
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveLkpd);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

async function loadLkpd() {
  try {
    const response = await fetch(`${API_URL}/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (data.success && data.data.length > 0) {
      currentLkpd = data.data[0];
      fillForm(currentLkpd);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createLkpd(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      currentLkpd = result.data;
      if(typeof showToast === 'function') showToast("Data LKPD berhasil disimpan", "#2E7D32");
      else alert("Data LKPD berhasil disimpan");
    } else {
      if(typeof showToast === 'function') showToast("Gagal menyimpan LKPD: " + result.message, "#c62828");
      else alert("Gagal menyimpan LKPD");
    }
  } catch (error) {
    console.error(error);
    if(typeof showToast === 'function') showToast("Terjadi kesalahan server", "#c62828");
    else alert("Terjadi kesalahan server");
  } finally {
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Jawaban';
    }
  }
}

async function updateLkpd(data) {
  try {
    const response = await fetch(`${API_URL}/${currentLkpd._id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      currentLkpd = result.data;
      if(typeof showToast === 'function') showToast("Data LKPD berhasil diperbarui", "#2E7D32");
      else alert("Data LKPD berhasil diperbarui");
    } else {
      if(typeof showToast === 'function') showToast("Gagal memperbarui LKPD: " + result.message, "#c62828");
      else alert("Gagal memperbarui LKPD");
    }
  } catch (error) {
    console.error(error);
    if(typeof showToast === 'function') showToast("Terjadi kesalahan server", "#c62828");
    else alert("Terjadi kesalahan server");
  } finally {
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Simpan Jawaban';
    }
  }
}

// Fill observation table

function fillObservationTable(tabelPengamatan) {
  if (!tabelPengamatan || !Array.isArray(tabelPengamatan)) return;

  tabelPengamatan.forEach((row, index) => {
    const rowNum = index + 1;
    const airInput = document.getElementById(`air${rowNum}`);
    const suhuInput = document.getElementById(`suhu${rowNum}`);
    const cahayaInput = document.getElementById(`cahaya${rowNum}`);
    const hasilInput = document.getElementById(`hasil${rowNum}`);

    if (airInput) airInput.value = row.air || "";
    if (suhuInput) suhuInput.value = row.suhu || "";
    if (cahayaInput) cahayaInput.value = row.cahaya || "";
    if (hasilInput) hasilInput.value = row.hasil || "";
  });
}

// Get observation table

window.addEventListener("beforeunload", () => {
  try {
    localStorage.setItem(
      "lkpdDraft",

      JSON.stringify(getFormData()),
    );
  } catch (error) {
    console.error(error);
  }
});

// Load draft

window.addEventListener("DOMContentLoaded", () => {
  if (currentLkpd) return;

  const draft = localStorage.getItem("lkpdDraft");

  if (!draft) return;

  try {
    const data = JSON.parse(draft);

    fillForm(data);
  } catch (error) {
    console.error(error);
  }
});
