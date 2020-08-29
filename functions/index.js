// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const _ = require("lodash");
const simpleParser = require("mailparser").simpleParser;
// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

var imaps = require("imap-simple");

var config = {
  imap: {
    user: "ticket@aethersol.com",
    password: "aether2020!",
    host: "aethersol.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 3000,
  },
};

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  try {
    imaps.connect(config).then(function (connection) {
      return connection.openBox("INBOX").then(function () {
        var searchCriteria = ["UNSEEN"];
        var fetchOptions = {
          bodies: ["HEADER", "TEXT", ""],
        };
        return connection
          .search(searchCriteria, fetchOptions)
          .then(function (messages) {
            messages.forEach(function (item) {
              var all = _.find(item.parts, { which: "" });
              var id = item.attributes.uid;
              var idHeader = "Imap-Id: " + id + "\r\n";
              simpleParser(idHeader + all.body, async (err, mail) => {
                // access to the whole mail object
                const prueba = mail.subject.split(": ");
                console.log(prueba[2]);
                const mensajePrueba = mail.text.split("On ");
                console.log(mensajePrueba[0]);
                const { value } = mail.from;
                const senderEmail = value[0].address;

                console.log(senderEmail.trim());

                const usuarioData = await admin
                  .firestore()
                  .collection("tickets")
                  .where("usuario.email", "==", senderEmail.trim())
                  .limit(1)
                  .get();

                const usuario = usuarioData.docs[0].data().usuario;

                console.log(usuario);

                await admin
                  .firestore()
                  .collection("messages")
                  .add({
                    content: mensajePrueba[0],
                    contentHtml: `<p>${mensajePrueba[0]}</p>`,
                    date: new Date(),
                    files: {},
                    sender: usuario,
                    ticket: prueba[2],
                  })
                  .then(async (docRef) => {
                    await admin
                      .firestore()
                      .collection("tickets")
                      .doc(prueba[2])
                      .update({
                        messages: admin.firestore.FieldValue.arrayUnion(
                          docRef.id
                        ),
                        status: "Open",
                        statusUpdatedAt: firebase.firestore.Timestamp.now(),
                        lastMessage: firebase.firestore.Timestamp.now(),
                      });
                  });
              });
            });
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
});
