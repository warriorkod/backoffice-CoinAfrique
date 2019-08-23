importScripts('https://www.gstatic.com/firebasejs/5.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.2/firebase-messaging.js');


firebase.initializeApp({
    messagingSenderId: "219453464814"
});

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  var extra_data = JSON.parse(payload.data.extra_data);
  console.log(extra_data);
  const title = "Nouveau message de " + extra_data.author_first_name + " "+ extra_data.author_last_name;
  const options = {
    body: extra_data.body,
    icon: './assets/img/coinafrique-icon.png'

  }
  return self.registration.showNotification(title, options)
})
