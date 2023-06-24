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

function getSleepByChildId(child_id) {
    let query = "SELECT * FROM sleeping_schedule WHERE child_id = ? ORDER BY date, time";
    return new Promise((resolve, reject) => {
        database.promise().query(query, child_id)
        .then((results) => {
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function getFoodByChildId(child_id) {
    let query = "SELECT * FROM feeding_schedule WHERE child_id = ? ORDER BY date, time";
    return new Promise((resolve, reject) => {
        database.promise().query(query, child_id)
        .then((results) => {
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function getAllByChildId(child_id) {
    let query = " SELECT 'sleeping_schedule' AS source, date, time, information FROM sleeping_schedule WHERE child_id = ? UNION SELECT 'feeding_schedule' AS source, date, time, information FROM feeding_schedule WHERE child_id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(query, child_id)
        .then((results) => {
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

module.exports = {
    createSleep,
    createEat,
    getSleepByChildId,
    getFoodByChildId,
    getAllByChildId,
}