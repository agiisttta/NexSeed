// Quiz nexseed

const BASE_URL = `${CONFIG.API_URL}/api/quiz`;

let userId = localStorage.getItem("userId");
let token = localStorage.getItem("token");

// Cek autentikasi pengguna
function checkAuth() {
  if (!token) {
    window.location.href = "login.html";
  }
}

checkAuth();
// KUNCI JAWABAN
const answerKey = {
  q1: "B",
  q2: "C",
  q3: "C",
  q4: "C",
  q5: "B",
  q6: "B",
  q7: "A",
  q8: "B",
  q9: "B",
  q10: "C",
};
// ELEMEN HTML
const submitBtn = document.getElementById("submitQuiz");
const resetBtn = document.getElementById("resetQuiz");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const scoreEl = document.getElementById("score");
const gradeEl = document.getElementById("grade");
const messageEl = document.getElementById("message");

const resultCard = document.getElementById("resultCard");

const discussion = document.querySelector(".discussion");
const discussionContent = document.getElementById("discussionContent");

const historyContent = document.getElementById("historyContent");
// SEMUA RADIO BUTTON
const radios = document.querySelectorAll("input[type='radio']");
// UPDATE PROGRESS
function updateProgress() {
  let answered = 0;

  for (let i = 1; i <= 10; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);

    if (checked) {
      answered++;
    }
  }

  progressText.innerHTML = answered + " / 10";

  progressFill.style.width = (answered / 10) * 100 + "%";
}
// LISTENER RADIO
radios.forEach((radio) => {
  radio.addEventListener("change", updateProgress);
});
// HITUNG NILAI
function calculateScore() {
  let correct = 0;

  let wrong = 0;

  const answers = {};

  for (let i = 1; i <= 10; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);

    if (checked) {
      answers["q" + i] = checked.value;

      if (checked.value === answerKey["q" + i]) {
        correct++;
      } else {
        wrong++;
      }
    }
  }

  return {
    correct,
    wrong,
    score: correct * 10,
    answers,
  };
}
// GET GRADE LABEL
function getGradeLabel(sc) {
  if (sc >= 90) return "Sangat Baik";
  if (sc >= 80) return "Baik";
  if (sc >= 70) return "Cukup";
  if (sc >= 60) return "Kurang";
  return "Perlu Belajar";
}

// Tombol selesai

submitBtn.addEventListener("click", async function () {
  // CEK APAKAH SEMUA SOAL SUDAH DIJAWAB
  let answered = 0;

  for (let i = 1; i <= 10; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);

    if (checked) {
      answered++;
    }
  }

  if (answered < 10) {
    alert("Masih ada soal yang belum dijawab!");

    return;
  }
  // HITUNG NILAI
  const result = calculateScore();

  const gradeLabel = getGradeLabel(result.score);

  scoreEl.innerHTML = result.score;
  // PREDIKAT
  if (result.score >= 90) {
    gradeEl.innerHTML = "🏆 Sangat Baik";

    messageEl.innerHTML =
      "Luar biasa! Kamu memahami materi perkecambahan dengan sangat baik.";
  } else if (result.score >= 80) {
    gradeEl.innerHTML = "😊 Baik";

    messageEl.innerHTML = "Bagus! Pemahamanmu sudah baik.";
  } else if (result.score >= 70) {
    gradeEl.innerHTML = "🙂 Cukup";

    messageEl.innerHTML =
      "Pemahamanmu cukup baik, tetapi masih perlu belajar lagi.";
  } else if (result.score >= 60) {
    gradeEl.innerHTML = "😕 Kurang";

    messageEl.innerHTML = "Masih banyak materi yang perlu dipelajari kembali.";
  } else {
    gradeEl.innerHTML = "📚 Perlu Belajar";

    messageEl.innerHTML =
      "Jangan menyerah, pelajari kembali materi lalu coba lagi.";
  }
  // TAMPILKAN HASIL
  resultCard.classList.add("active");

  discussion.classList.add("active");
  // SCROLL KE HASIL
  resultCard.scrollIntoView({
    behavior: "smooth",
  });
  // PEMBAHASAN
  showDiscussion(result);
  // SIMPAN KE SERVER
  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          answers: result.answers,
          score: result.score,
          correct: result.correct,
          wrong: result.wrong,
          grade: gradeLabel,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Quiz berhasil disimpan ke server.");

        showToast("Hasil kuis berhasil disimpan!", "#2E7D32");

        loadHistory();
      } else {
        console.error("Gagal simpan quiz:", data.message);

        showToast("Gagal menyimpan hasil kuis.", "#c62828");
      }
    } catch (err) {
      console.error("Error simpan quiz:", err);

      showToast("Error koneksi ke server.", "#c62828");
    }
  } else {
    console.log("User belum login, hasil tidak disimpan ke server.");
  }
});

// Pembahasan jawaban

function showDiscussion(result) {
  discussionContent.innerHTML = `

    <div class="answer-box">
        <h4>1. Faktor utama perkecambahan</h4>
        <p><b>Jawaban: B. Air</b></p>
        <p>Air diperlukan untuk proses imbibisi sehingga enzim aktif dan embrio mulai tumbuh.</p>
    </div>

    <div class="answer-box">
        <h4>2. Penyerapan air oleh biji</h4>
        <p><b>Jawaban: C. Imbibisi</b></p>
        <p>Imbibisi adalah proses masuknya air ke dalam biji yang memulai perkecambahan.</p>
    </div>

    <div class="answer-box">
        <h4>3. Bagian pertama yang muncul</h4>
        <p><b>Jawaban: C. Radikula</b></p>
        <p>Radikula merupakan calon akar yang pertama kali keluar dari biji.</p>
    </div>

    <div class="answer-box">
        <h4>4. Suhu optimum</h4>
        <p><b>Jawaban: C. 25°C</b></p>
        <p>Pada suhu 25°C enzim bekerja optimal sehingga perkecambahan berlangsung dengan baik.</p>
    </div>

    <div class="answer-box">
        <h4>5. Air berlebih</h4>
        <p><b>Jawaban: B. Membusuk</b></p>
        <p>Air yang terlalu banyak mengurangi oksigen sehingga biji mudah membusuk.</p>
    </div>

    <div class="answer-box">
        <h4>6. Kecambah di tempat gelap</h4>
        <p><b>Jawaban: B. Etiolasi</b></p>
        <p>Kecambah tumbuh tinggi, kurus, dan berwarna pucat karena kekurangan cahaya.</p>
    </div>

    <div class="answer-box">
        <h4>7. Fungsi radikula</h4>
        <p><b>Jawaban: A. Menyerap air dan mineral</b></p>
        <p>Radikula berkembang menjadi akar yang berfungsi menyerap air dan unsur hara.</p>
    </div>

    <div class="answer-box">
        <h4>8. Ciri-ciri kecambah etiolasi</h4>
        <p><b>Jawaban: B. Etiolasi</b></p>
        <p>Batang memanjang dan pucat merupakan ciri khas etiolasi.</p>
    </div>

    <div class="answer-box">
        <h4>9. Peran cahaya</h4>
        <p><b>Jawaban: B. Pembentukan klorofil</b></p>
        <p>Cahaya diperlukan agar daun dapat membentuk klorofil dan melakukan fotosintesis.</p>
    </div>

    <div class="answer-box">
        <h4>10. Kondisi terbaik</h4>
        <p><b>Jawaban: C. Air Optimal, Suhu 25°C, Cahaya Terang</b></p>
        <p>Kombinasi tersebut menghasilkan perkecambahan yang sehat dan optimal.</p>
    </div>

    <hr>

    <h3 style="text-align:center;color:#2e7d32;">
        🎉 Hasil Akhir
    </h3>

    <p style="text-align:center;font-size:18px;">
        Jawaban Benar :
        <b>${result.correct}</b> dari 10 soal
    </p>

    <p style="text-align:center;font-size:18px;">
        Jawaban Salah :
        <b>${result.wrong}</b> soal
    </p>

    `;
}

// Reset quiz

resetBtn.addEventListener("click", function () {
  if (!confirm("Yakin ingin mengulang kuis?")) {
    return;
  }

  // Hapus semua jawaban

  radios.forEach((radio) => {
    radio.checked = false;
  });

  // Reset progress

  progressFill.style.width = "0%";

  progressText.innerHTML = "0 / 10";

  // Reset hasil

  scoreEl.innerHTML = "0";

  gradeEl.innerHTML = "-";

  messageEl.innerHTML = "Kerjakan seluruh soal terlebih dahulu.";

  // Sembunyikan hasil

  resultCard.classList.remove("active");

  discussion.classList.remove("active");

  discussionContent.innerHTML = `
        Pembahasan akan muncul setelah tombol
        <b>Selesai</b> ditekan.
    `;

  // Kembali ke atas

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

// Load riwayat kuis

async function loadHistory() {
  if (!token || !historyContent) return;

  try {
    const response = await fetch(`${BASE_URL}/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success && data.data.length > 0) {
      let html = '<div class="history-list">';

      data.data.forEach((item, index) => {
        const date = new Date(item.createdAt);

        const dateStr = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const timeStr = date.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        });

        html += `
                <div class="history-item">
                    <div class="history-rank">#${index + 1}</div>
                    <div class="history-info">
                        <span class="history-date">
                            <i class="fa-solid fa-calendar"></i>
                            ${dateStr} — ${timeStr}
                        </span>
                        <span class="history-detail">
                            Benar: <b>${item.correct}</b> |
                            Salah: <b>${item.wrong}</b> |
                            Predikat: <b>${item.grade}</b>
                        </span>
                    </div>
                    <div class="history-score">${item.score}</div>
                </div>
                `;
      });

      html += "</div>";

      historyContent.innerHTML = html;
    } else {
      historyContent.innerHTML = `
                <p style="text-align:center;color:#888;">
                    <i class="fa-solid fa-inbox"></i>
                    Belum ada riwayat kuis.
                </p>
            `;
    }
  } catch (err) {
    console.error("Error load history:", err);

    historyContent.innerHTML = `
            <p style="text-align:center;color:#c62828;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Gagal memuat riwayat.
            </p>
        `;
  }
}

// Inisialisasi

updateProgress();

loadHistory();
