var scheduleLocation = "http://localhost:3000/schedule/";
var timeTableLocation = "http://localhost:3000/timetable/";

function sanitizeInput() {
  var inputValidation = document.getElementById("valid-input");
  inputValidation.classList.remove("input-validation");
  inputValidation.classList.add("show-input-validation");
  inputValidation.classList.add("error-div");
}
function sanitizeSpaces(str) {
  if (!str.replace(/\s/g, "").length) {
    return true;
  } else return false;
}
function sanitizeInputChar(str) {
  var formateCheck = /^[A-Za-z0-9 ]+$/;
  if (formateCheck.test(str) == false) {
    return true;
  } else return false;
}
function findCourseCode() {
  var subjCodeInputVal = document.getElementById("subjCode");
  if (
    subjCodeInputVal.value.length === 0 ||
    sanitizeSpaces(subjCodeInputVal.value) ||
    sanitizeInputChar(subjCodeInputVal.value)
  ) {
    sanitizeInput();
  } else {
    const url = timeTableLocation + subjCodeInputVal.value;
    location.href = url;
  }
}
function findTimeTable() {
  var subjectcode = document.getElementById("subjCode");
  var courseCode = document.getElementById("courseCode");
  var courseComponent = document.getElementById("courseComponent");
  if (
    subjectcode.value.length === 0 ||
    courseCode.value.length === 0 ||
    sanitizeSpaces(subjectcode.value) ||
    sanitizeSpaces(courseCode.value) ||
    sanitizeInputChar(subjectcode.value) ||
    sanitizeInputChar(courseCode.value)
  ) {
    sanitizeInput();
  } else {
    if (courseComponent.value.length > 0) {
      if (
        sanitizeInputChar(courseComponent.value) ||
        sanitizeSpaces(courseComponent.value)
      ) {
        sanitizeInput();
      } else {
        const url =
          timeTableLocation +
          subjectcode.value +
          "/" +
          courseCode.value +
          "/" +
          courseComponent.value;
        location.href = url;
      }
    } else {
      const url =
        timeTableLocation +
        subjectcode.value +
        "/" +
        courseCode.value +
        "/" +
        courseComponent.value;
      location.href = url;
    }
  }
}
function findSubCourseList() {
  var scheduleNameinputVal = document.getElementById("scheduleName");
  if (
    scheduleNameinputVal.value.length === 0 ||
    sanitizeSpaces(scheduleNameinputVal.value) ||
    sanitizeInputChar(scheduleNameinputVal.value)
  ) {
    sanitizeInput();
  } else {
    const url =
      scheduleLocation + "listSubjectCourse/" + scheduleNameinputVal.value;
    location.href = url;
  }
}
function findSchdlCourses() {
  const url = scheduleLocation + "nameAndCourses";
  location.href = url;
}
function deleteAll() {
  const url = scheduleLocation + "deleteAll";
  location.href = url;
}
function deleteSchedule() {
  var scheduleNameinputVal = document.getElementById("scheduleName");
  if (
    scheduleNameinputVal.value.length === 0 ||
    sanitizeSpaces(scheduleNameinputVal.value) ||
    sanitizeInputChar(scheduleNameinputVal.value)
  ) {
    sanitizeInput();
  } else {
    const url = scheduleLocation + "delete/" + scheduleNameinputVal.value;
    location.href = url;
  }
}
