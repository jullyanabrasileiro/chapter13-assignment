// Import libraries
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const PersonModel = require('./PersonModel');

const app = express();
app.use(express.json());

const PORT = 3000;
const uri = "mongodb://127.0.0.1:27017"; 
const client = new MongoClient(uri);

let db;


client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        db = client.db("PersonDB"); //database `PersonDB`
    })
    .catch(err => console.error("Failed to connect:", err));

//1. Insert Persons
app.post('/api/v1/persons', async (req, res) => {
    const persons = [
        { firstName: "John", family: "Doe", city: "New York", country: "USA", salary: 2000 },
        { firstName: "Jane", family: "Smith", city: "London", country: "UK", salary: 3000 },
        { firstName: "Mike", family: "Johnson", city: "Toronto", country: "Canada", salary: 1500 }
    ];
    try {
        const result = await db.collection('persons').insertMany(persons);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//2. Get All Persons
app.get('/api/v1/persons', async (req, res) => {
    try {
        const persons = await db.collection('persons').find().toArray();
        res.status(200).send(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//3. Get Person by ID
app.get('/api/v1/persons/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const person = await db.collection('persons').findOne({ _id: new ObjectId(id) });
        if (!person) return res.status(404).send("Person not found");
        res.status(200).send(person);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//4. Update Person by ID
app.patch('/api/v1/persons/:id', async (req, res) => {
    const id = req.params.id;
    const { salary } = req.body; 
    try {
        const result = await db.collection('persons').updateOne(
            { _id: new ObjectId(id) },
            { $set: { salary } }
        );
        if (result.modifiedCount === 0) return res.status(404).send("Person not found or unchanged");
        res.status(200).send("Person updated successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//5. Delete Person by ID
app.delete('/api/v1/persons/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.collection('persons').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).send("Person not found");
        res.status(200).send("Person deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//6. Filter Data (Salary)
app.get('/api/v1/persons/filter', async (req, res) => {
    const { salary, firstName } = req.query;
    const query = {};
    if (salary) query.salary = parseInt(salary);
    if (firstName) query.firstName = firstName;

    try {
        const persons = await db.collection('persons').find(query).toArray();
        res.status(200).send(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//7. Advanced Filtering
app.get('/api/v1/persons/advanced-filter', async (req, res) => {
    const { above, below, min, max } = req.query;
    const query = {};

    if (above) query.salary = { $gt: parseInt(above) };
    if (below) query.salary = { $lt: parseInt(below) };
    if (min && max) query.salary = { $gte: parseInt(min), $lte: parseInt(max) };

    try {
        const persons = await db.collection('persons').find(query).toArray();
        res.status(200).send(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//8. Sorting
app.get('/api/v1/persons/sort', async (req, res) => {
    const { sortBy } = req.query;
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = 1; 

    try {
        const persons = await db.collection('persons').find().sort(sortOptions).toArray();
        res.status(200).send(persons);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//9. Statistics
app.get('/api/v1/persons/statistics', async (req, res) => {
    try {
        const stats = await db.collection('persons').aggregate([
            { $group: {
                _id: null,
                avgSalary: { $avg: "$salary" },
                minSalary: { $min: "$salary" },
                maxSalary: { $max: "$salary" }
            }}
        ]).toArray();
        res.status(200).send(stats[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(PORT, () => console.log(`Server running at http://localhost:4000`));
