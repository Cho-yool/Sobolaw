import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getToken,
  deleteToken,
  getMessaging,
  MessagePayload,
  onMessage,
} from "firebase/messaging";

navigator.serviceWorker
  .register("firebase-messaging-sw.js")
  .then(function (registration) {
    console.log("Service worker successfully registered.");
    return registration;
  })
  .catch(function (err) {
    console.error("Unable to register service worker.", err);
  });

export const firebaseConfig = {
  apiKey: "AIzaSyB3CisHLdztQymU4FUl3meEz7_GI_GF4OY",
  authDomain: "sobolaw-b1e95.firebaseapp.com",
  databaseURL: "sobolaw-b1e95.firebaseio.com",
  projectId: "sobolaw-b1e95",
  storageBucket: "sobolaw-b1e95.appspot.com",
  messagingSenderId: "909268063265",
  appId: "1:909268063265:web:89d9d47ae882d2c7d37f60",
  measurementId: "G-Y1XC8ZL32F",
};

export const vapidKey =
  "BGAtZFQc1lIkAulhINVAOXPqqi28e8_pxzuTvV21nxPXXiiXjkkZUnsXTalnlxxImuV90KcXInxrHNjcq2VcFuU";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
  appendMessage(payload);
});

// 허가 요청
export function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: vapidKey,
        })
          .then((token: string) => {
            console.log(`푸시 토큰 발급 완료 : ${token}`);
            resolve(token); // 토큰을 resolve하여 Promise 완료
          })
          .catch((err) => {
            console.error("푸시 토큰 가져오는 중에 에러 발생:", err);
            reject(err); // 에러 발생시 reject하여 Promise 완료
          });
      } else if (permission === "denied") {
        console.log("푸시 권한 차단");
        reject(new Error("푸시 알림이 거부되었습니다.")); // 거부 시에도 reject하여 Promise 완료
      } else {
        console.log("푸시 허용을 기다리는 중...");
        reject(new Error("푸시 허용 대기 중입니다.")); // 다른 상황도 reject하여 Promise 완료
      }
    });
  });
}

export function deleteTokenFromFirebase() {
  // Delete registration token.
  getToken(messaging)
    .then((currentToken) => {
      deleteToken(messaging)
        .then(() => {
          console.log("Token deleted.", currentToken);
        })
        .catch((err) => {
          console.log("Unable to delete token. ", err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving registration token. ", err);
    });
}

// Add a message to the messages element.
function appendMessage(payload: MessagePayload) {
  const messagesElement = document.querySelector("#messages")!;
  const dataHeaderElement = document.createElement("h5");
  const dataElement = document.createElement("pre");
  dataElement.style.overflowX = "hidden;";
  dataHeaderElement.textContent = "Received message:";
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderElement);
  messagesElement.appendChild(dataElement);
}
