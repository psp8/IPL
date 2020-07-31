const fs = require("fs");
const express = require('express');
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const won = require("./ipl/won");
const extraRuns = require("./ipl/extraRuns");
const economy = require("./ipl/economy");
const MostRuns = require("./ipl/MostRuns");

const app = express();

app.use(express.static('public'));
//Allow  CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";


app.get('/extraruns', function(req, res) {
    const year = req.query.year;
    if (!year) {
        res.send({});
    }
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deliveries => {
                    var result_extra_runs = extraRuns(matches, year, deliveries);
                    res.send(result_extra_runs);
                })
        });
});



app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});