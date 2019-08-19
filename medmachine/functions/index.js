const functions = require('firebase-functions');
const init = require('./servercreds/FirebaseFile');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const database = init.firestore();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
    }
    next();   
});


app.post('/fetch' , functions.https.onRequest((request, response) => {
    response.send({
        this: 'works',
        dumb: 'ass',
        body: request.body
    })
}));


app.post('/servicedata' , functions.https.onRequest((request, response) => {
    database.collection('DIAGNOSIS').get().then((data) => {
        const bodyArray = request.body.userDiagnosis;
        const resultedArray = [];
        data.forEach((doc) => {
          const datajson = {}; const dataSymptoms = doc.data().symptoms; const similarArrays = [];
          let a; let i;
          for(i = 0; i < bodyArray.length; i++) {
              for(a = 0; a < dataSymptoms.length; a++) {
                  if(bodyArray[i] === dataSymptoms[a]) {
                      similarArrays.push(dataSymptoms[a]);
                      datajson['Disease'] = {
                          DiseaseName: doc.id,
                          DiseaseKey: Math.floor(Math.random() * 1000000),
                          Probability: ((similarArrays.length / bodyArray.length) * 100).toFixed(2).toString() + "%",
                          DiagnosisSimilarity:similarArrays,
                          DiseaseSymptoms: dataSymptoms
                      };
                      resultedArray.push(datajson);
                  }
              }
          }
   
        });
        const results = {
            process: true,
            usersymptoms: bodyArray,
            diagnosis: resultedArray.filter((index, intice) => resultedArray.indexOf(index) === intice)
        };
        response.send(results);
        return console.log('this works');
    }).then(snap => console.log(snap)).catch(error => response.status(500).send(error));
 }));

exports.api = functions.https.onRequest(app);
