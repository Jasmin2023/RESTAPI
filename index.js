var express = require('express');
var app = express();
var repo = require('./repos/repo');
const bodyParser = require("body-parser");
var cors = require('cors')
let router = express.Router();
var port = process.env.PORT || 1000;
// for updating - adding a new item we will need to add a middleware - Step [3]
// support somone passing json data to us like numbers or search values
app.use(express.json());
app.use(cors());

//List all job applications
 
//Step [1] - get all data
router.get('/', function (req, res, next){
    repo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All Data",
            "data" : data
        });
    },function(err){
        next(err);
    });
});
// Step [2] - Get by Id
router.get('/:id', function(req, res, next){
    repo.getByID(req.params.id, function(data){
        if(data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": `${req.params.job}`,
                "data" : data
            });
        } else {
            res.status(404).send({
                "status": 404,
                "statusText": "NOt OK",
                "message": `${req.params.id} can not be found`,
                "error" : {
                    "code": "NOT_FOUND",
                    "message": `${req.params.id} can not be found`
                }
            });
        }
         
    });
});

//Step [4] - Add new item
router.post('/', function(req, res, next){
    repo.insert(req.body, function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New data Added",
            "data": data
        });
    }, function(err){
        next(err);
    });
})

//Step [4] update item
router.put('/:id', function(req, res, next){
    repo.getByID(req.params.id, function(data){
        if(data){
            //attempt to update the data since we found an object
            repo.update(req.body, req.params.id, function(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "data: '" + req.params.id + "' updated",
                    "data": data
            });
        });
        }
        else{
            res.status(404).send({
                "status":404,
                "statusText": "Not Found",
                "message": "The data with id '" + req.params.id + "' was not found",
                "error":{
                    "code": "NOT_FOUND",
                    "message": "The data with id '" + req.params.id + "' was not found"
                }
            });
        }
    }, function(err){
        next(err);
    });
})

//Step [5] - delete
router.delete('/:id', function(req, res, next) {
    repo.getByID(req.params.id, function(data) {
        if(data){
            repo.delete(req.params.id, function(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Job '" + req.params.id + "' deleted",
                    "data": data
                })
            })
        } else {
            res.status(404).send({
                "status":404,
                "statusText": "Not Found",
                "message": "The Job with id '" + req.params.id + "' was not found",
                "error":{
                    "code": "NOT_FOUND",
                    "message": "The Job with id '" + req.params.id + "' was not found"
                }
            })
        }
    }, function(err){
        next(err);
    })
});

app.use(bodyParser.json());
app.use('/api', router);
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});