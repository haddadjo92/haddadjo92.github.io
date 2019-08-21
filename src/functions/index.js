// Project Console: https://console.firebase.google.com/project/eschooldemo-2b247/overview

const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hellooooooooooooooo");
// });


// Project Console: https://console.firebase.google.com/project/eschooldemo-2b247/overview
// Function URL (AddNewStudent): https://us-central1-eschooldemo-2b247.cloudfunctions.net/AddNewStudent
// Function URL (GetAllStudent): https://us-central1-eschooldemo-2b247.cloudfunctions.net/GetAllStudent


exports.GetAllStudent = functions.https.onRequest((req,res)=>{
    admin.firestore()
    .collection('Student')
    .get()
    .then(data  => {

        let Students = []
        data.forEach(doc => {
            Students.push(doc.data())
        })

        return res.json(Students)
    })
    .catch(err => console.error(err))
});



exports.AddNewStudent = functions.https.onRequest((req,res)=>{

    if(req.method !== "POST"){
        return res.status(400).json({Error : 'Method Not Allowed!!!!!'})
    }  

    const newStudent = {
        ID : req.body.ID,
        FirstName : req.body.FirstName,
        MiddleName : req.body.MiddleName,
        LastName : req.body.LastName,
        DateOfBirth : req.body.DateOfBirth,
        Gender : req.body.Gender,
        Email : req.body.Email,
        Password : req.body.Password
    };


    admin.firestore()
         .collection('Student')
         .add(newStudent)
         .then(doc => {
             res.json({message : `Student has been recorded successfully`})
         })
         .catch(err => {
             res.status(500).json({error : `something went wrong!`});
             console.error(err)
         })
});