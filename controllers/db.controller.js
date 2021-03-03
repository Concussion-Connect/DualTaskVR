// Initialize the default app
var admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore();
const Session = require('../models/session.model');

const addSession = async (req, res, next) => {
    try {
        const data = {
            "currentTrial": 2000,
            "wordList": 500
        };
        db.collection('sessions').doc('121212').set(data);
        res.send('Record saved successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSession = async (req, res, next) => {
    try {
        const snapshot = await db.collection('sessions').get();
        let target;
        snapshot.forEach((doc) => {
            if (doc.id === req.params.id) {
                target = doc.data();
                console.log(doc.id, '=>', doc.data());
            }
        });
        res.send(target);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const observe = async (req, res, next) => {
    try {
        const doc = db.collection('sessions').doc('123456');
        const observer = doc.onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: $(docSnapshot)`);
        })
        res.send("Just got changed");
    } catch {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSession,
    getSession,
    observe
}
