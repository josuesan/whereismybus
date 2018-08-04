const functions = require('firebase-functions');
const admin = require('firebase-admin');

//Firebase Init
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({ origin: true });

exports.saveLocation = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        const lat = request.params[0].split("/")[1];
        const lng = request.params[0].split("/")[2];
        const alt = request.params[0].split("/")[3];

        return admin.firestore()
            .collection("location")
            .add({
                latitude: lat,
                longitude: lng,
                altitude: alt,
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