import express from "express";
import fs from "fs";
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*'}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public/live"));

app.get("/live", (req, res, next) => {
    res.sendFile(__dirname + "/public/live/index.html");
});

app.listen(8888, () => console.log("Server running on port 8888, ready for arp poisoning"));
