const database = require('../database');

function create(child) {
    let query = 'INSERT INTO children (first_name, last_name, birthdate, gender, user_id) VALUES (?, ?, ?, ?, ?)';
    let queryValues = [child.firstname, child.surname, child.birthdate, child.gender, child.user_id];
    return new Promise((resolve, reject) => {
        database.promise().query(query, queryValues).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

function getAll() {
    let query = "SELECT * FROM children";
    return new Promise((resolve, reject) => {
        database.promise().query(query)
        .then((results) => {
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function findByParentId(id) {
    let query = "SELECT * FROM children WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(query, [id])
        .then((results) => {
            // console.log("results[0][0]", results[0])
            if(!results[0]) {
                reject("child not found");
            }
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteByParentId(id) {
    let queryText = "delete from children where user_id = ?";
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

function deleteById(id) {
    let queryText = "delete from users where id = ?";
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


module.exports = {
    create,
    findByParentId,
    deleteByParentId,
    deleteById,
    getAll
}