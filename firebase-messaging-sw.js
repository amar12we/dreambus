importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCHkQ5k5wKEommWakTm09mCtcJxsRdgJIk",
    authDomain: "dreamliner-421b0.firebaseapp.com",
    projectId: "dreamliner-421b0",
    storageBucket: "dreamliner-421b0.appspot.com",
    messagingSenderId: "454472970770",
    appId: "1:454472970770:web:cbf95c8b7523f24f2b5ecb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "Dreamliner";
    const options = {
        body: payload.notification?.body || "You have a new notification from Dreamliner.",
        icon: "/dreambus/logo.png",
        badge: "/dreambus/logo.png",
        data: {
            url: payload.data?.url || "https://amar12we.github.io/dreambus/"
        }
    };

    self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "https://amar12we.github.io/dreambus/";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes("/dreambus/") && "focus" in client) {
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});