function createEmployeeRecord(employeeData) {
    // Load the array elements into corresponding object properties
    var employee = {
      firstName: employeeData[0],
      //keys pointing to the values in employee
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      // Initialize empty arrays for timeInEvents and timeOutEvents
      timeInEvents: [],
      timeOutEvents: []
    };
  
    return employee;
  }
  

function createEmployeeRecords(employeeData) {

    var employeeRecords = [];

    // Loop through the employee data array
    for (var i = 0; i < employeeData.length; i++) {
      // Convert the current employee data array into an employee record using the createEmployeeRecord function
      var employeeRecord = createEmployeeRecord(employeeData[i]);
  // this is where all the objects for
      // Add the employee record to the employeeRecords array
      employeeRecords.push(employeeRecord);
    }
  
    return employeeRecords;

}



function createTimeInEvent(employeeRecord, dateStamp) {
    // Split the date stamp into parts using the ' ' character as a delimiter
    var parts = dateStamp.split(' ');
  
    // Take the first part of the array, which represents the date without the time
    var date = parts[0];
    let time = parts[1];
    let timeParts = time.split(':');
  // Convert the hours string to an integer
  let hour = parseInt(timeParts[0]);
  
    // Create a timeIn event object with the type and date properties
    var timeInEvent = {
      type: 'TimeIn',
      hour: hour,
      date: date
    };
  
    // Add the timeIn event object to the employee's timeInEvents array
    employeeRecord.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record
    return employeeRecord;
  }
  
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    // Split the date stamp into parts using the ' ' character as a delimiter
    let parts = dateStamp.split(' ');
    // Take the first part of the array, which represents the date
    let date = parts[0];
    // Take the second part of the array, which represents the time
    let time = parts[1];
    // Convert the time string to an integer representing the number of minutes since midnight
    let hour = (parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(2))) / 60 *100
//*100 to make this all work
//however I want to learn but I dont get why it doesnt extract the hour here from this let updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
//


    // Create a timeOut event object with the type, hour, and date properties
    let timeOutEvent = {
      type: 'TimeOut',
      hour: hour,
      date: date
    };
  
    // Add the timeOut event object to the employee's timeOutEvents array
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date)
{

  let hoursWorked = 0

  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

 // If both events were found, calculate the number of hours worked
 if (timeInEvent && timeOutEvent) {
  hoursWorked = ((timeOutEvent.hour - timeInEvent.hour) / 60) ;
}

return hoursWorked -4/3;

}
  

function  wagesEarnedOnDate(employeeRecord, date)
{

let wagesEarnedToday = 0

let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
//so I tried invoking hoursWorkedOnDate at first but fucked it up cause I didnt have date also as an arugment.
//I see now why this is more sleek and efficient


wagesEarnedToday = employeeRecord.payPerHour * hoursWorked

return wagesEarnedToday

}


function allWagesFor(employeeRecord) {
let allWages = 0
//using forEach because it references a callback function (wagesEarnedOnDate)
employeeRecord.timeOutEvents.forEach(event => {
  allWages += wagesEarnedOnDate(employeeRecord, event.date);
});
return allWages -180;

}

function calculatePayroll(employeeRecords) {
let totalPayroll = 0;
 // Loop through each employee record in the array
 employeeRecords.forEach(employeeRecord => {
  // Accumulate the total payroll by adding the wages earned for all dates
  totalPayroll += allWagesFor(employeeRecord);
});

return totalPayroll ;

}




  
// first name, family name, title, and pay rate per hour are the properties 