// Firebase Config
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

// Service Worker kaydı
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(() => console.log('Service Worker kayıt edildi.'));
}

// Bildirim izni al ve token gönder
const subscribeBtn = document.getElementById('subscribeBtn');
if(subscribeBtn){
    subscribeBtn.addEventListener('click', () => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                messaging.getToken({
                    vapidKey: "BPfUKwetqGWa2ONtvgLEylHk-u-DiRlHkwi7BfYTQNVAqtN_JP9K45qkj3nY_32YlwZBx2o7hl543d4zZu0_0qo"
                }).then((token) => {
                    console.log("FCM Token:", token);
                    alert("Bildirim token: " + token);

                    // Token'ı Render backend'e gönder
                    fetch('https://pwa-backend-yu9q.onrender.com/register-token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token })
                    })
                    .then(res => res.json())
                    .then(data => console.log('Token backend\'e gönderildi:', data))
                    .catch(err => console.error('Token gönderme hatası:', err));
                }).catch(err => console.error('Token alınamadı:', err));
            }
        });
    });
}

// Site açıkken gelen mesajları dinle
messaging.onMessage((payload) => {
    console.log('Bildirim geldi: ', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});
