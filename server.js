const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require('request');   // test 4 working
const app = express().use(bodyParser.json()); // creates http serve
const fetch = require('node-fetch'); // test
const getRawBody = require('raw-body') // test
const token  = '<https://hooks.nabu.casa/gAAAAABezmLvPFgGvLfpzFDGnotIEi38mnzNznyGbylijG1WEZ-0X-mgRvYMi7_aMVzUs1E2CmkKNT_sV_5Qk5GTboaTrTwyOUcKT_s4GAFwA4xWjW8d2l1I-OYPJkJHNK_J5jk8p-OWb51REfKcHn5DLtIfc78D6HPEdLUSyeJFwYU-SXuioOw=>'  // test
const mongoose = require('mongoose');
//const {MongoClient} = require('mongodb'); // online database
const todoRoutes = express.Router();
const path = require('path'); /// 3
const PORT = process.env.PORT||4000;  //// 1

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully :)");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});



todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

//////test/////Express router that handles a POST and responds////
// todoRoutes.route('/test').post(function(req, res){

//     doSome.work(function(){

//         const webhookURL = '<https://hooks.nabu.casa/gAAAAABezmLvPFgGvLfpzFDGnotIEi38mnzNznyGbylijG1WEZ-0X-mgRvYMi7_aMVzUs1E2CmkKNT_sV_5Qk5GTboaTrTwyOUcKT_s4GAFwA4xWjW8d2l1I-OYPJkJHNK_J5jk8p-OWb51REfKcHn5DLtIfc78D6HPEdLUSyeJFwYU-SXuioOw=>';

//         const data = JSON.stringify({
//         'text': 'Dany 123',
//         });

//         fetch(webhookURL, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json; charset=UTF-8',
//             },
//             body: data,
//           }).then((response) => {
//             console.log(response);
//           });
  
//       res.status(200);
//       res.send();
    
//     });
  
//   });
//////////TEST 2 ///////////////////

// app.post('/test2', async (req, res) => {
//     console.log('test2')
  
//     // // We'll compare the hmac to our own hash
//     // const hmac = req.get('X-Shopify-Hmac-Sha256')
  
//     // Use raw-body to get the body (buffer)
//     const body = await getRawBody(req)
  
//     // Create a hash using the body and our key
//     const hash = crypto
//       .createHmac('sha256', secretKey)
//       .update(body, 'utf8', 'hex')
//       .digest('base64')
  

//   })

////////////////test 3//////////////


// app.get('/test3', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // return challenge
//     return res.end(req.query.challenge);
// });


// app.post('/test3', (req, res) => {
//     // check if verification token is correct
//     if (req.query.token !== token) {
//         return res.sendStatus(401);
//     }

//     // print request body
//     console.log(req.body);

//     // return a text response
//     const data = {
//         responses: [
//             {
//                 type: 'text',
//                 elements: ['Hi', 'Hello']
//             }
//         ]
//     };

//     res.json(data);
// });

//////////////test 4 working////////////////

request.post(
    'https://hooks.nabu.casa/gAAAAABezmLvPFgGvLfpzFDGnotIEi38mnzNznyGbylijG1WEZ-0X-mgRvYMi7_aMVzUs1E2CmkKNT_sV_5Qk5GTboaTrTwyOUcKT_s4GAFwA4xWjW8d2l1I-OYPJkJHNK_J5jk8p-OWb51REfKcHn5DLtIfc78D6HPEdLUSyeJFwYU-SXuioOw=',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);


/////////////////////////


todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/todos', todoRoutes);

if (process.env.NODE_ENV === 'production') {   //// 3
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});