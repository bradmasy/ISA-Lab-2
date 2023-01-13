const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const app = express();
const PORT = 5000;
const viewDirectory = `${__dirname}/views`;
console.log(viewDirectory);
const cors = require("cors");
//const fetch = require("node-fetch");
//import fetch from "node-fetch";

app.use(cors());
app.set("view engine", "ejs");
app.set('views', viewDirectory); // sets the views to the views folder for lookup for pages
app.use(bodyParser.urlencoded());
app.use("/scripts", express.static("scripts"));
app.use("/css", express.static("css"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post("/chatbot", (req, res) => {
    console.log("Request recieved");

    let message = req.body.message;
    console.log(req.body);
    console.log(`Message recieved: ${message}`);
    let number = message.match(/\d+/); // match for any number.

    if (number) {

        // $.ajax({
        //     url: `http://numbersapi.com/${number}?type=trivia`,
        //     method: "GET",
        //     dataType: "json",
        //     success: function (data) {
        //         console.log(data);
        //         res.json({
        //             text: data
        //         })
        //     },
        //     error: function (error) {
        //         res.json({
        //             text: "there has been an error processing the file."
        //         })
        //     }
        // })

        axios.get(`http://numbersapi.com/${number}?type=trivia`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
            })
            .then(textData => {
                console.log(textData);
                res.json({ 
                    text: textData
                })
            })
            .catch(error => {
                res.json({
                    text: "there has been an error processing the file."
                })
            })


        // fetch(`http://numbersapi.com/${number}`)
        //     .then(response => {
        //         if (response.ok) {
        //             console.log(response);
        //             return response.text();
        //         }
        //     })
        //     .then(textData => {
        //         console.log(textData);
        //         res.json({
        //             text: textData
        //         })
        //     })

        //     .catch(error => {
        //         res.json({
        //             text: "there has been an error processing the file."
        //         })
        //     })
    }
    else {
        res.json({
            text: "there was no number found in the string provided."
        })
    }

})


app.get("/", (req, res) => {
    res.render("index");
});