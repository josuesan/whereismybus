//Clouds Functions por Firebase SDK para crear funciones en la nube y desencadenantes de configuración.
const functions = require('firebase-functions');

//SDK del administrador de Firebase para acceder a la base de datos Cloud Firestore de Firebase.
const admin = require('firebase-admin');

//Firebase Init
admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);

const cors = require('cors')({ origin: true });

exports.saveLocation = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const message = request.body.message.split("&");
        const lat = message[0].split("=")[1];
        const lng= message[1].split("=")[1];
        
        return admin.firestore()
            .collection("location")
            .add({
                latitude: lat,
                longitude: lng,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
                const code = {
                    code: 200,
                    status: "complete"
                }
                return response.status(200).set('Content-Type', 'application/json').send(code);
            })
            .catch((err) => {
                return response.status(500).send(err)
            })
    });
});


//Contingencia
exports.saveLocation2 = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const lat = request.params[0].split("/")[1]
        const lng = request.params[0].split("/")[2];
        
        return admin.firestore()
            .collection("location")
            .add({
                latitude: lat,
                longitude: lng,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
                const code = {
                    code: 200,
                    status: "complete"
                }
                return response.status(200).set('Content-Type', 'application/json').send(code);
            })
            .catch((err) => {
                return response.status(500).send(err)
            })
    });
});

//Limpiar historial de messages
exports.cleanMessageHistory = functions.https.onRequest((request, response) => {

    return cors(request, response, () => { 
        admin.firestore()
            .collection("messages")
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    admin.firestore()
                        .collection("messages")
                        .doc(doc.id)
                        .delete();
                });
                const code = {
                    code: 200,
                    status: "complete"
                }
                return response.status(200).set('Content-Type', 'application/json').send(code);
            })
            .catch((err) => {
                return response.status(500).send(err)
            })
    });
});


