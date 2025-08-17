// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBMe8SfkLPZek2wqi6dU1YdPhNNziXHRPw",
  authDomain: "pwa0510-c9241.firebaseapp.com",
  projectId: "pwa0510-c9241",
  messagingSenderId: "93919479765",
  appId: "1:93919479765:web:2f1a6a6808daad37cc9f5c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Arka planda mesaj alındı ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
