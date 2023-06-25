const database  = require('../database');

function create(timelineEntry) {
    let query = 'INSERT INTO timeline (date, timeline_title, timeline_info, child_id) VALUES (?, ?, ?, ?)';
    let queryValues = [timelineEntry.date, timelineEntry.timelineTitle, timelineEntry.timelineInfo, timelineEntry.child_id];
    console.log(queryValues);
    return new Promise((resolve, reject) => {
        database.promise().query(query, queryValues).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

function getAllByChildId(child_id) {
    let query = "SELECT * FROM timeline WHERE child_id = ?";
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
    create,
    getAllByChildId
}