import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2iMX8FURT-Gd0ZH3UuvZIurBNdI-RpoY",
  authDomain: "csm-sx9.firebaseapp.com",
  projectId: "csm-sx9",
  storageBucket: "csm-sx9.appspot.com",
  messagingSenderId: "751349027496",
  appId: "1:751349027496:web:a73b159ccc03587d83a89d",
};
initializeApp(firebaseConfig);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-DL77ELTZXJ');

const db = getFirestore();
const collectionRef = collection(db, "snippets");
const auth = getAuth();

let username;
auth.onAuthStateChanged((user) => {
  if (user) {
    username = user.reloadUserInfo.screenName;
    document
      .querySelectorAll(".display-auth")
      .forEach((el) => (el.style.display = "block"));
    document
      .querySelectorAll(".display-noauth")
      .forEach((el) => (el.style.display = "none"));
    document.querySelector("#name").innerText = username;
    document.querySelector("#pfp").src = user.photoURL;
  } else {
    username = null;
    document
      .querySelectorAll(".display-auth")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".display-noauth")
      .forEach((el) => (el.style.display = "block"));
    document.querySelector("#name").innerText = username;
    document.querySelector("#pfp").src = null;
  }
});

document.querySelector("#unauth").onclick = () => signOut(auth);

document.querySelector("#auth").onclick = () =>
  signInWithPopup(auth, new GithubAuthProvider());

document.querySelector("#submit").onclick = () => {
  addDoc(collection(db, "snippets"), {
    title: document.querySelector("#add-title").value,
    code: document.querySelector("#add-code").value,
    lang: document.querySelector("#add-lang").value,
    created: Date.now(),
    author: username,
  });
  document.querySelector("#popup").close();
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getSnippets(num) {
  getDocs(query(collectionRef, orderBy("created", "desc"), limit(num)))
    .then((snapshot) => {
      document.querySelector("#snippets").innerHTML = "";
      let codes = [];
      console.clear();
      snapshot.docs.forEach((doc) => {
        codes.push({ ...doc.data() });
      });
      codes = shuffleArray(codes);
      codes.forEach((snippet) => {
        let card = document.createElement("div");
        let code = document.createElement("pre");
        let title = document.createElement("h3");

        card.classList.add("snippet");
        code.innerText = snippet.code;
        title.innerText =
          snippet.author + " / " + snippet.title + " - " + snippet.lang;

        card.appendChild(title);
        card.appendChild(code);
        document.querySelector("#snippets").appendChild(card);
      });
    })
    .catch(console.error);
}

getSnippets(15);
document.querySelector("#more").onclick = () =>
  getSnippets(prompt("How Many Snippets?"));
document.querySelector("#add").onclick = () =>
  document.querySelector("#popup").showModal();
