// ========================
// AOS Animasyon Başlat
// ========================
AOS.init({ duration: 1000, once: true });

// ========================
// Scroll Reveal Efekti
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".card, .countdown-card, .header h1, .glass-card, .chat-button");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if(elementTop < windowHeight - revealPoint){
        el.classList.add("active-reveal");
      } else {
        el.classList.remove("active-reveal");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// ========================
// Countdown Timer + Glow Animasyonu
// ========================
const targetDate = new Date("2025-09-06T00:00:00").getTime();
let lastTime = {};

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const countdownEl = document.querySelector(".countdown");
    if (!countdownEl) return;

    if (distance < 0) {
        countdownEl.innerHTML = `<div class="time-box" style="width:100%; animation: popGlow 1s infinite alternate;">
            🎉 Doğum günü geldi!
        </div>`;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    updateTimeBox("days", days);
    updateTimeBox("hours", hours);
    updateTimeBox("minutes", minutes);
    updateTimeBox("seconds", seconds);
}

function updateTimeBox(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const box = document.getElementById(id + "Box");
    if (!box) return;

    if (lastTime[id] !== value) {
        el.innerText = value;

        // Efekt: Pop ve glow animasyonu
        box.style.animation = "popGlow 0.3s ease";
        box.style.transform = "scale(1.2)";
        box.style.boxShadow = "0 0 20px rgba(255,77,109,0.7), 0 0 30px rgba(255,153,172,0.5)";
        setTimeout(() => {
            box.style.transform = "scale(1)";
            box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            box.style.animation = "";
        }, 300);
    }
    lastTime[id] = value;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ========================
// Özel gün başlığı animasyonu
// ========================
const countdownTitle = document.querySelector(".countdown-title");
if(countdownTitle){
    countdownTitle.style.animation = "glowPulse 2s ease-in-out infinite";
}

// ========================
// Pop & Glow Animasyon Keyframes
// ========================
const style = document.createElement('style');
style.innerHTML = `
@keyframes popGlow {
    0% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    50% { transform: scale(1.2); box-shadow: 0 0 20px rgba(255,77,109,0.7), 0 0 30px rgba(255,153,172,0.5); }
    100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
}
`;
document.head.appendChild(style);

// ========================
// Şifreli Mesaj
// ========================
function showPasswordPrompt() {
    if (localStorage.getItem("access_granted") === "true") {
        document.getElementById("secret-message").style.display = "block";
    } else {
        document.getElementById("passwordPrompt").style.display = "block";
    }
}

function checkPassword() {
    const input = document.getElementById("passwordInput")?.value || document.getElementById("secretPassword")?.value;
    const secretMsg = document.getElementById("secret-message") || document.getElementById("secretMessage");
    const errMsg = document.getElementById("errorMsg");

    if (!input) return;

    if (input.toLowerCase() === "dilara" || input === "06092025") {
        secretMsg.style.display = "block";
        if(errMsg) errMsg.textContent = "";
        localStorage.setItem("access_granted", "true");
        document.getElementById("passwordPrompt").style.display = "none";
    } else {
        secretMsg.style.display = "none";
        if(errMsg) errMsg.textContent = "❗ Şifre yanlış, tekrar dene.";
    }
}

window.onload = () => {
    if (localStorage.getItem("access_granted") === "true") {
        const secretMsg = document.getElementById("secret-message") || document.getElementById("secretMessage");
        if(secretMsg) secretMsg.style.display = "block";
    }
};

// ========================
// Günaydın / Günün Mesajı Popup
// ========================
window.addEventListener("load", () => {
    const popup = document.getElementById("gunaydinPopup");
    if(!popup) return;

    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = now.toLocaleString("tr-TR", { month: "long" });

    let message = "", emoji = "", colorClass = "";

    if (hour >= 6 && hour <= 14) {
        message = `Günaydın prensesimm <br> ${date} ${month} ${dayName}, saat ${hour}:${minutes}`;
        emoji = "🌞";
        colorClass = "color-morning";
    } else if (hour === 14 && minutes > "00" || (hour > 14 && hour <= 18)) {
        message = `Günün senin kadar güzel geçsin sevgilimm <br>${date} ${month} ${dayName}, saat ${hour}:${minutes}`;
        emoji = "☀️";
        colorClass = "color-day";
    } else if ((hour === 18 && minutes > "00") || (hour > 18 && hour <= 23)) {
        message = `İyi akşamlar güzelimm <br>${date} ${month} ${dayName}, saat ${hour}:${minutes}`;
        emoji = "🌇";
        colorClass = "color-evening";
    } else {
        message = `İyi geceler tatlı rüyalar aşkımm benim<br> ${date} ${month} ${dayName}, saat ${hour}:${minutes}`;
        emoji = "🌙";
        colorClass = "color-night";
    }

    popup.innerHTML = `
      <div class="popup-content">
        <div class="emoji">${emoji}</div>
        <div>${message}</div>
      </div>
    `;
    popup.classList.add(colorClass);
    popup.style.animation = "fadeInScale 1s ease forwards";

    setTimeout(() => {
        popup.style.animation = "fadeOutScale 1s ease forwards";
    }, 9000);
});

// ========================
// Galeri Şifre ve Yükleme
// ========================
function unlockGallery() {
    const pw = document.getElementById("galleryPassword").value.trim().toLowerCase();
    const galeri = document.getElementById("photoGallery");
    const hata = document.getElementById("galleryError");

    if (pw === "05.10.19") {
        galeri.style.display = "block";
        hata.textContent = "";
    } else {
        galeri.style.display = "none";
        hata.textContent = "❗ Şifre yanlış, tekrar dene.";
    }
}

const imageUpload = document.getElementById("imageUpload");
if(imageUpload){
    imageUpload.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "Yüklenen Görsel";
            img.setAttribute("data-aos", "zoom-in");
            img.style.width = "100%";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "0 0 10px rgba(255,255,255,0.2)";
            document.querySelector(".gallery").appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// ========================
// Formspree Gizli Ziyaret Bildirimi
// ========================
window.addEventListener("DOMContentLoaded", function() {
    fetch("https://formspree.io/f/myzpjpno",  {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ziyaret: "Ziyaretçi siteyi açtı." })
    }).then(() => console.log("Ziyaret bildirimi gönderildi."))
      .catch(err => console.error("Ziyaret bildirimi hatası:", err));
});

// ========================
// Firebase PWA Bildirimleri
// ========================
const firebaseConfig = {
    apiKey: "AIzaSyBMe8SfkLPZek2wqi6dU1YdPhNNziXHRPw",
    authDomain: "pwa0510-c9241.firebaseapp.com",
    projectId: "pwa0510-c9241",
    storageBucket: "pwa0510-c9241.firebasestorage.app",
    messagingSenderId: "93919479765",
    appId: "1:93919479765:web:2f1a6a6808daad37cc9f5c",
    measurementId: "G-BJJTQJEN6V"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const vapidKey = "BPfUKwetqGWa2ONtvgLEylHk-u-DiRlHkwi7BfYTQNVAqtN_JP9K45qkj3nY_32YlwZBx2o7hl543d4zZu0_0qo";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(() => console.log('Service Worker kayıt edildi.'));
}

// ========================
// Render Backend Token Gönderimi
// ========================
const subscribeBtn = document.getElementById('subscribeBtn');
if(subscribeBtn){
    subscribeBtn.addEventListener('click', () => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                messaging.getToken({ vapidKey }).then((token) => {
                    console.log("FCM Token:", token);
                    alert("Bildirim token: " + token);
                    fetch('https://pwa-backend-yu9q.onrender.com/register-token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token })
                    })
                    .then(res => res.json())
                    .then(data => console.log('Token backend\'e gönderildi:', data))
                    .catch(err => console.error('Token gönderme hatası:', err));
                });
            }
        });
    });
}

// Firebase gelen mesajları göster
messaging.onMessage((payload) => {
    console.log('Bildirim geldi: ', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});

// ========================
// Genel Service Worker Kayıt
// ========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker kayıt başarılı:', reg.scope))
            .catch(err => console.error('Service Worker kayıt hatası:', err));
    });
} else {
    console.log('Service Worker desteklenmiyor.');
}
