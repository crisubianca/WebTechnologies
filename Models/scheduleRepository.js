const database = require('../database');

function createSleep(schedule) {
    let query = 'INSERT INTO sleeping_schedule (child_id, date, time, information) VALUES (?, ?, ?, ?)';
    let queryValues = [schedule.child_id, schedule.date, schedule.time, schedule.information];
    return new Promise((resolve, reject) => {
        database.promise().query(query, queryValues).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

function createEat(schedule) {
    let query = 'INSERT INTO feeding_schedule (child_id, date, time, information) VALUES (?, ?, ?, ?)';
    let queryValues = [schedule.child_id, schedule.date, schedule.time, schedule.information];
    return new Promise((resolve, reject) => {
        database.promise().query(query, queryValues).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = {
    createSleep,
    createEat,
}