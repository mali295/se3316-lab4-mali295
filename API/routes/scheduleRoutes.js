const express = require("express");
const router = express.Router();
const fs = require("fs");
const scheduleFilePath = "public/json/scheduleData.json";

// creating a schedule
router.post("/create", (req, res) => {
  var schedule = {
    scheduleName: req.body.scheduleName,
    subjectCourse: [],
  };
  let isScheduleExist = false;
  // reading Data File
  fs.readFile(scheduleFilePath, (err, data) => {
    var rawData;
    if (data && data[0] != null) {
      rawData = JSON.parse(data); // Parsing JSON DAta
      for (var obj in rawData) {
        if (rawData[obj].scheduleName === req.body.scheduleName) {
          isScheduleExist = true;
        }
      }
    }
    if (!isScheduleExist) {
      if (data[0] === undefined) {
        rawData = [];
      }
      rawData.push(schedule);
      // Writing Async Data to Json File
      fs.writeFile(
        scheduleFilePath,
        JSON.stringify(rawData, null, 2),
        (err) => {
          if (err) {
            throw err;
          } else {
            // reading Data File
            fs.readFile(scheduleFilePath, (err, data) => {
              let rawData = JSON.parse(data); // Parsing JSON DAta
              // Render the File with Response DAta
              res.json(rawData);
            });
          }
        }
      );
    } else {
      // Render the File with Error
      res.statusCode = 500;
      res.json("Error: Schedule Name Already Exists!");
    }
  });
});

// Saving a list of Subject and Course Code Pairs
router.post("/saveScheduleInfo", (req, res) => {
  var scheduleName = req.body.scheduleName;
  var subj_Course = {
    subject: req.body.subject,
    catalog_nbr: req.body.catalog_nbr,
  };
  let isScheduleExist = false;
  var getScheduleIndex = null;
  // reading Data File
  fs.readFile(scheduleFilePath, (err, data) => {
    if (Object.keys(data).length > 0) {
      var rawData = JSON.parse(data);
      for (var obj in rawData) {
        if (rawData[obj].scheduleName === scheduleName) {
          isScheduleExist = true;
          if (rawData[obj].subjectCourse.length > 0) {
            for (var i in rawData[obj].subjectCourse) {
              if (
                rawData[obj].subjectCourse[i].subject === req.body.subject &&
                rawData[obj].subjectCourse[i].catalog_nbr ===
                  req.body.catalog_nbr
              ) {
                getScheduleIndex = null;
              } else {
                getScheduleIndex = obj;
              }
            }
          } else {
            getScheduleIndex = obj;
          }
        }
      }
    }
    if (isScheduleExist) {
      if (getScheduleIndex === null) {
        // Render the File with REsponse data
        res.json(rawData);
      } else {
        rawData[getScheduleIndex].subjectCourse.push(subj_Course);
        // Writing Async Data to Json File
        fs.writeFile(
          scheduleFilePath,
          JSON.stringify(rawData, null, 2),
          (err) => {
            if (err) {
              throw err;
            } else {
              // Render the File with Response DAta
              res.json({
                scheduleName: scheduleName,
                responseData: rawData[getScheduleIndex].subjectCourse,
              });
            }
          }
        );
      }
    } else {
      // Render the File with Error
      res.statusCode = 500;
      res.json("Error: Schedule Name doesn't Exists!");
    }
  });
});

// Get a List of Subject Code and Course Code Pairs for a given schedule
router.get("/listSubjectCourse/:scheduleName", (req, res) => {
  var scheduleName = req.params.scheduleName;
  // reading Data File
  fs.readFile(scheduleFilePath, (err, data) => {
    if (Object.keys(data).length > 0) {
      var rawData = JSON.parse(data); // Parsing JSON DAta
      var getScheduleIndex = null;
      for (var obj in rawData) {
        if (rawData[obj].scheduleName === scheduleName) {
          getScheduleIndex = obj;
        }
      }
      if (getScheduleIndex) {
        // Render the File with Response Data
        res.json({
          scheduleName: scheduleName,
          responseData: rawData[getScheduleIndex].subjectCourse,
        });
      } else {
        // Render the File with Error
        res.json({ errorData: "Error: Schedule Name doesn't Exists!" });
      }
    } else {
      // Render the File with Error
      res.json({ errorData: "Error: Schedule Name doesn't Exists!" });
    }
  });
});

// Get a List of Schedule names and Course in each schedule
router.get("/nameAndCourses", (req, res) => {
  // reading Data File
  fs.readFile(scheduleFilePath, (err, data) => {
    if (Object.keys(data).length > 0) {
      var listSchedules = [];
      var rawData = JSON.parse(data); // Parsing JSON DAta
      for (var obj in rawData) {
        if (rawData[obj].subjectCourse) {
          listSchedules.push({
            scheduleName: rawData[obj].scheduleName,
            NumberOfCourses: rawData[obj].subjectCourse.length,
          });
        } else {
          listSchedules.push({
            scheduleName: rawData[obj].scheduleName,
            NumberOfCourses: 0,
          });
        }
      }
      if (listSchedules.length > 0) {
        // Render the File with info Data
        res.json({ responseData: listSchedules });
      } else {
        // Render the File with Error
        res.statusCode = 500;
        res.json({ errorData: "Error: No Data Found!" });
      }
    } else {
      // Render the File with Error
      res.statusCode = 500;
      res.json({ errorData: "Error: No Data Found!" });
    }
  });
});
// Delete a Schedule with Given Name
router.get("/delete/:scheduleName", (req, res) => {
  var scheduleName = req.params.scheduleName;
  // reading Data File
  fs.readFile(scheduleFilePath, (err, data) => {
    if (Object.keys(data).length > 0) {
      var rawData = JSON.parse(data); // Parsing JSON DAta
      var udpatedData = [];
      var isScheduleExists = false;
      for (var obj in rawData) {
        if (rawData[obj].scheduleName != scheduleName) {
          udpatedData.push(rawData[obj]);
        } else {
          isScheduleExists = true;
        }
      }
      if (isScheduleExists) {
        // Writing Async Data to Json File
        fs.writeFile(
          scheduleFilePath,
          JSON.stringify(udpatedData, null, 2),
          (err) => {
            // Render the File with info success
            res.json({
              message: "Deleted Schedule Successfully!",
              responseData: udpatedData,
            });
          }
        );
      } else {
        // Render the File with Error
        res.statusCode = 500;
        res.json({ message: "Schedule Name doesn't Exists" });
      }
    } else {
      // Render the File with Error
      res.statusCode = 500;
      res.json({ message: "Schedule Name doesn't Exists" });
    }
  });
});

// Delete All Schedules
router.get("/deleteAll", (req, res) => {
  // Deleting all data from File
  fs.writeFile(scheduleFilePath, [], (err) => {
    if (err) {
      throw err;
    }
    // Render the File with info
    res.json({ message: "All Schedules Deleted Successfully!" });
  });
});

module.exports = router;
