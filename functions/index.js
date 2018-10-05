const functions = require('firebase-functions');
const admin = require('firebase-admin');

//Firebase Init
admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);

const cors = require('cors')({ origin: true });

exports.saveLocation = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const lat = request.params[0].split("/")[1];
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


//Limpiar historial de messages
exports.exampleRuta = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {
        const ruta = [
            { lat: "10.501186", lng: "-66.891596" },
            { lat: "10.501877", lng: "-66.893777" },
            { lat: "10.502367", lng: "-66.895335" },
            { lat: "10.501836", lng: "-66.897225" },
            { lat: "10.501264", lng: "-66.898741" },
            { lat: "10.502244", lng: "-66.899468" },
            { lat: "10.502489", lng: "-66.90061" },
            { lat: "10.503755", lng: "-66.900298" },
            { lat: "10.504", lng: "-66.901524" },
            { lat: "10.504368", lng: "-66.902832" },
            { lat: "10.50481728156821", lng: "-66.90422371029854" }];

        admin.firestore()
            .collection("students")
            .doc("ykiBJC52ygHzie3c9FwS")
            .update({
                status: "En el transporte"
            })
            .then(() => {
                for (let i = 0; i < 10; i++) {

                    admin.firestore()
                        .collection("location")
                        .add({
                            latitude: ruta[i].lat,
                            longitude: ruta[i].lng,
                            createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                            setTimeout(() => {
                                if (i === 9) {
                                    admin.firestore()
                                        .collection("students")
                                        .doc("ykiBJC52ygHzie3c9FwS")
                                        .update({
                                            status: "Llegó a su hogar"
                                        })
                                        .then(() => {
                                            const code = {
                                                code: 200,
                                                status: "complete"
                                            }
                                            return response.status(200).set('Content-Type', 'application/json').send(code);
                                        })
                                        .catch((err) => console.error(err));
                                }
                            }, 10000 * (i + 1));

                        })
                        .catch((err) => {
                            console.error(err);
                        })


                }
            })
            .catch((err) => console.error(err));
    });
})