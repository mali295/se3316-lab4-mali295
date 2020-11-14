const express = require("express");
const router = express.Router();
const fs = require("fs");
const timeTableFilePath = "public/json/timetableData.json";

// Get All Acailable Subjects and Descriptions
router.get("/subjectAndDesc", (req, res) => {
  // reading Data File
  debugger;
  fs.readFile(timeTableFilePath, (err, data) => {
    if (err) throw err;

    var respData = [];
    let rawData = JSON.parse(data);
    for (var obj in rawData) {
      respData.push({
        subject: rawData[obj].subject,
        className: rawData[obj].className,
      });
    }
    res.json(respData);
  });
});

// Get All Course Codes for a Given Subjects
router.get("/:subject", (req, res) => {
  var subject = req.params.subject;
  //reading Data File
  fs.readFile(timeTableFilePath, (err, data) => {
    if (err) throw err;

    var respData = [];
    let rawData = JSON.parse(data);
    for (var obj in rawData) {
      if (rawData[obj].subject === subject) {
        respData.push({
          catalog_nbr: rawData[obj].catalog_nbr,
        });
      }
    }
    if (respData.length > 0) {
      // Render the File with Response Data
      res.statusCode = 200;
      res.json(respData);
    } else {
      // Render the File with Error
      res.statusCode = 500;
      res.json(respData);
    }
  });
  //res.json("result");
});

// Get a Timetable entry for a given subject, course code and course component
router.get("/:subject/:catalog_nbr/:ssr_component?", (req, res) => {
  var subject = req.params.subject;
  var catalog_nbr = req.params.catalog_nbr;
  var ssr_component = req.params.ssr_component || null;
  // reading Data File
  fs.readFile(timeTableFilePath, (err, data) => {
    if (err) throw err;

    var respData = [];
    let rawData = JSON.parse(data);

    for (var obj in rawData) {
      if (
        rawData[obj].subject === subject &&
        rawData[obj].catalog_nbr === catalog_nbr
      ) {
        if (
          ssr_component != null &&
          rawData[obj].course_info[0].ssr_component === ssr_component
        ) {
          respData.push(rawData[obj]);
        } else {
          respData.push(rawData[obj]);
        }
      }
    }

    res.json(respData);
  });
});

module.exports = router;
