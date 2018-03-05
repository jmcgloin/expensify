import * as firebase from "firebase";

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };


// // database.ref("expenses").once("value")
// // 	.then((snapshot) => {
// // 		snapshot.forEach((child) => {
// // 			expenses.push({id: child.key, ...child.val()});
// // 		});
// // 	})
// // 	.catch((e) => {
// // 		console.log("Data retrieval failed: ", e);
// // });

// // database.ref("expenses").on("value", (snapshot) => {
// // 	let expenses = [];
// // 	snapshot.forEach((child) => {
// // 		expenses.push({id: child.key, ...child.val()});
// // 	});
// // 	console.log(expenses);
// // });

// database.ref("expenses").on("child_removed", (snapshot) => {
// 	console.log("removed ", snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", (snapshot) => {
// 	console.log("changed", snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_added", (snapshot) => {
// 	console.log("added", snapshot.key, snapshot.val());
// });