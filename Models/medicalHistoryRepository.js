const database  = require('../database');

function create(medicalHistoryEntry) {
    let query = 'INSERT INTO medical_history (child_id, date, age, weight, height, medical_procedure, additional_information) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let queryValues = [medicalHistoryEntry.child_id, medicalHistoryEntry.date, medicalHistoryEntry.age, medicalHistoryEntry.weight, medicalHistoryEntry.height, medicalHistoryEntry.procedure, medicalHistoryEntry.note];
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
    let query = "SELECT * FROM medical_history WHERE child_id = ?";
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

function deleteById(id){
    let queryText = "DELETE FROM medical_history WHERE id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(queryText, [id])
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteByChildId(child_id) {
    let queryText = "DELETE FROM medical_history WHERE child_id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(queryText, [child_id])
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

module.exports = {
    create,
    getAllByChildId,
    deleteById,
    deleteByChildId
}