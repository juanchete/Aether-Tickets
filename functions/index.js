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

//Author: Juan Lopez
// Def:Esta funcion consiste en agarrar los mensajes del email de aether y guardarlos en el chat de su ticket correspondiente
exports.addMessage = functions.https.onRequest(async (req, res) => {
  try {
    imaps.connect(config).then(function (connection) {       //Se conecta a IMAP para consumir los mensajes del email
      return connection.openBox('INBOX').then(function () {   //Selecciona los emails que estan marcados como no vistos
          var searchCriteria = ['UNSEEN'];               
          var fetchOptions = {
              bodies: ['HEADER', 'TEXT', ''],
          };
          return connection.search(searchCriteria, fetchOptions).then(function (messages) {
              messages.forEach(function (item) {
                  var all = _.find(item.parts, { "which": "" })
                  var id = item.attributes.uid;
                  var idHeader = "Imap-Id: "+id+"\r\n";
                  simpleParser(idHeader+all.body, async (err, mail) => {
                      // access to the whole mail object
                      const prueba = mail.subject.split(": ");
                      const flag = prueba.includes("Response of your ticket with id")  //Comprueba si uno de los emails consite en una respuesta a uno de los tickets
                    
                    
                      const {value} = mail.from
                      const senderEmail= value[0].address 

               

                      if (flag == true) {           //Si se activa el flag, se procede a guardar email

                        // console.log(mail.textAsHtml);
                        var mySubString = mail.textAsHtml.substring(         //Se busca en el HTML del email, el parrafo donde se escribio el mensaje
                          mail.textAsHtml.indexOf("<p>") + 3, 
                          mail.textAsHtml.indexOf("</p>")
                      );
                        console.log(mySubString);
                      // console.log(mensajePrueba[0]) 
                      // console.log(mensajePrueba);

                      // console.log(flag);
                      // console.log(prueba[2])
                      // console.log(prueba);

                        const usuarioData = await admin.firestore().collection('tickets').where('usuario.email','==',senderEmail.trim()).limit(1).get() //Se procede a obtener los datos de la persona que lo encvio


                const usuario = usuarioData.docs[0].data().usuario;

                // console.log(usuario);

                      await admin.firestore().collection('messages').add({  //Se procede a guardar el mensaje
                        content: mySubString,
                        contentHtml: `<p>${mySubString}</p>`,
                        date: new Date(),
                        files:{},
                        sender: usuario,
                        ticket: prueba[2]
                      }).then(async (docRef) => {
                            await admin.firestore().collection("tickets").doc(prueba[2]).update({
                               messages: admin.firestore.FieldValue.arrayUnion(docRef.id),
                               lastMessage: new Date (),
                               status: 'Open',
                               statusUpdatedAt: new Date()
                            });
                            console.log('ready');
                    })

                    connection.addFlags(item.attributes.uid, "\Seen", (err) => {  //Se marca como visto el email si se proceso con exito
                      if (err){
                          console.log('Problem marking message for deletion');
                          rej(err);
                      }
        
                  })
                      }else{
                        console.log('rebotado');
                      }

                      
             
                  });
              });
            });
            
          });
      });
  } catch (error) {
    console.log(error);
  }
  
  
  
  });
//Author: Juan Lopez
//Def: Este email consiste en enviarle al usuario un email si su email se cierra
  exports.emailGoodBye = functions.firestore  
    .document('tickets/{userId}')
    .onUpdate((change, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = change.after.data();

     

      // access a particular field as you would any JS property
      const status = newValue.status;

      if (status == 'Solved') {
        firebase.firestore().collection("mail").add({
          to: `juanlopezlmg@gmail.com`, //ticket.usuario.email
          message: {
            subject: `Your ticket with id: ${id} is closed`,
            text:  `We hope that your ticket was solved and the solution that we give you acomplish all your expectations. If you have any other doubt please see our FAQ or create another ticket, see you soon.`,
            html: text,
          },
        });
      }

      // perform desired operations ...
    });
