import { initializeApp } from "@firebase/app";
import {
  getFirestore, collection, getDoc, getDocs, addDoc, query, orderBy, limit, doc
} from "@firebase/firestore";
import express from "express";
import cors from "cors";

const firebaseConfig = {
  apiKey: "AIzaSyC2iMX8FURT-Gd0ZH3UuvZIurBNdI-RpoY",
  authDomain: "csm-sx9.firebaseapp.com",
  projectId: "csm-sx9",
  storageBucket: "csm-sx9.appspot.com",
  messagingSenderId: "751349027496",
  appId: "1:751349027496:web:a73b159ccc03587d83a89d"
}
initializeApp(firebaseConfig);

const db = getFirestore();
const collectionRef = collection(db, "snippets");
const app = express();

app.use(express.json());
app.use(cors({
  methods: ["GET", "POST"],
  origin: "*",
}));

app.post("/api/new", (req, res) => {
  addDoc(collection(db, "snippets"), {
    title: req.body.title,
    code: req.body.code,
    author: req.body.author,
  });
});
app.get("/api/list/:limit");
app.get("/api/get/:id");
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
// app.listen(process.env.PORT, () => console.log());

// getDoc(doc(db, "snippets", "GUDvccWrHtTKetg8PU9m")).then(d => console.log(d.data()));

// getDocs(query(collectionRef, orderBy("title"), limit(3))).then(snapshot => {
//   let codes = [];
//   console.clear();
//   snapshot.docs.forEach(doc => {
//     codes.push({...doc.data()});
//   });
//   console.log(codes);
// }).catch(console.error);