/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeArray) {
    let employeeObj = {
        firstName:employeeArray[0],
        familyName:employeeArray[1],
        title:employeeArray[2],
        payPerHour:employeeArray[3],
        timeInEvents:[],
        timeOutEvents:[],
        }
        return employeeObj;
}

function createEmployeeRecords(arrayOfEmployees) {
    let employeesArray = [];
    for(let i = 0; i < arrayOfEmployees.length; i++){
        let employeeObj = createEmployeeRecord(arrayOfEmployees[i]);
        employeesArray.push(employeeObj);
    }
    return employeesArray;
}

function createTimeInEvent(timeIn) {
    let timeInArray = timeIn.split(" ");
    let timeInObj = {};
    timeInObj.type = "TimeIn";
    timeInObj.date = timeInArray[0];
    timeInObj.hour = Number(timeInArray[1]);
    this.timeInEvents.push(timeInObj);
    return this;
}

function createTimeOutEvent(timeOut){
    let timeOutArray = timeOut.split(" ");
    let timeOutObj = {};
    timeOutObj.type = "TimeOut";
    timeOutObj.date = timeOutArray[0];
    timeOutObj.hour = Number(timeOutArray[1]);
    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate(dateIn){
    console.log(`date:`, dateIn);
    let clockIn = -1;
    let clockOut = -1;
    //console.log("object:", this.timeInEvents);
    for(const eventIn of this.timeInEvents){
        //console.log("eventIn:" , eventIn);
        if (eventIn.date === dateIn) {
            clockIn = eventIn.hour;
        }
    }
    for(const eventOut of this.timeOutEvents){
        //console.log("eventOut", eventOut);
        if (eventOut.date === dateIn) {
            clockOut = eventOut.hour;
        } 
    }
    return Math.abs(clockIn - clockOut)/100;
}

function wagesEarnedOnDate(dateIn){
    let hours = hoursWorkedOnDate.call(this, dateIn);
    //console.log("hours:", hours);
    let wage = this.payPerHour;
    return hours * wage;
}

function findEmployeeByFirstName(srcArray, firstName){
    for(const employee of srcArray){
        if(employee.firstName === firstName){
            return employee;
        }
    }
}

function calculatePayroll(employeeRecords){
    let payrollTotal = 0;
    for(const employee of employeeRecords){
        console.log("employee:", employee);
        let individualPay = allWagesFor.call(employee);
        payrollTotal = payrollTotal + individualPay;
    }
    return payrollTotal;
}

