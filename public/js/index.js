import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
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
const snippetsRef = collection(db, "snippets");

function createCard(snippet) {
  let card = document.createElement("div");
  let title = document.createElement("h3");
  let view = document.createElement("button");
  let code = document.createElement("pre");

  card.classList.add("snippet");
  title.innerText = snippet.author + " / " + snippet.title + "." + snippet.lang;
  view.innerText = "View";
  view.onclick = () => window.open("snippet.html?id=" + snippet.id);
  code.innerText = snippet.code;

  card.appendChild(title);
  card.appendChild(code);
  card.appendChild(view);
  document.querySelector("#snippets").appendChild(card);
}

function getSnippets(amount, order, random) {
  getDocs(query(snippetsRef, orderBy(order, "desc"), limit(amount)))
    .then((snapshot) => {
      document.querySelector("#snippets").innerHTML = "";
      let codes = [];
      console.clear();
      snapshot.docs.forEach((doc) => {
        codes.push({ ...doc.data(), id: doc.id });
      });
      codes = random ? shuffleArray(codes) : codes;
      codes.forEach(createCard);
    })
    .catch(console.error);
}

getSnippets(15, "created", false);
document.querySelector("#more").onclick = () =>
  getSnippets(prompt("How Many Snippets?"), "created", false);
document.querySelector("#add").onclick = () =>
  document.querySelector("#popup").showModal();
