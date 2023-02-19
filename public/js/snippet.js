import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2iMX8FURT-Gd0ZH3UuvZIurBNdI-RpoY",
  authDomain: "csm-sx9.firebaseapp.com",
  projectId: "csm-sx9",
  storageBucket: "csm-sx9.appspot.com",
  messagingSenderId: "751349027496",
  appId: "1:751349027496:web:a73b159ccc03587d83a89d",
};
initializeApp(firebaseConfig);

const db = getFirestore();
const urlParams = new URLSearchParams(window.location.search);
const snippetId = urlParams.get("id");

function setInfo(info) {
  document.querySelector("title").innerText = info.author + "/" + info.title + "." + info.lang;
  document.querySelector("#snippet-title").innerText = info.author + "/" + info.title + "." + info.lang;
  document.querySelector("#snippet-code").innerText = info.code;
  document.querySelector("#snippet-code").classList.add("language-" + info.lang);
  // Prism.plugins.NormalizeWhitespace.setDefaults({
  //   'remove-trailing': true,
  //   'remove-indent': true,
  //   'left-trim': true,
  //   'right-trim': true,
  //   'break-lines': 80,
  //   'indent': 2,
  //   'remove-initial-line-feed': false,
  //   'tabs-to-spaces': 2,
  //   'spaces-to-tabs': 2
  // });
  // Prism.highlightAll();
}

let docRef;
try {
  docRef = doc(db, "snippets", snippetId);
} catch (error) {
  setInfo({
    author: "SYSTEM",
    title: "ERROR",
    lang: "js",
    code: error,
  })
}

getDoc(docRef).then((docSnap) => {
if (docSnap.exists()) {
  setInfo(docSnap.data());
} else {
  setInfo({
    author: "SYSTEM",
    title: "404",
    lang: "js",
    code: "console.log('Not Found');",
  });
}
}).catch((e) => setInfo({
  author: "SYSTEM",
  title: "ERROR",
  lang: "js",
  code: e,
}));