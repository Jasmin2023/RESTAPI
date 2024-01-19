const { json } = require('express');
let fs = require('fs');
const FILE_NAME = './assets/data.json';

let jobsRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    },
    getByID: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            } else {
                let job = JSON.parse(data).find(item => item.id == id);
                resolve(job);
            }
        })
    },
    insert: function(newData, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let jobs = JSON.parse(data);
                jobs.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(jobs), function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(newData);
                    }
                });
            }
        });
    },
    update: function(newData, id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            } else {
                let jobs = JSON.parse(data);
                let job = jobs.find(item => item.id == id);
                if(job){
                    // will take new data and update the data
                    Object.assign(job, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(jobs), function(err){
                        if(err){
                            reject(err);
                        } else {
                            resolve(newData);
                        }
                    })
                }
            }
        })
    },
    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            } else {
                let jobs = JSON.parse(data);
                let jobIndex = jobs.findIndex(item => item.id == id);
                console.log(jobIndex)
                if(jobIndex !== -1){
                    jobs.splice(jobIndex, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(jobs), function(err){
                        if(err){
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }
            }
        })
    }
}

module.exports = jobsRepo;