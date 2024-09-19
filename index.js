const express = require('express');
var cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
app.use(cors());
const port = 3000;
const uri = "mongodb://localhost:27017";

//let collection;

async function getClient() {
    const client = new MongoClient(uri);
    return client.connect()
}

async function getContactCollection() {
    return getClient().then(client => {
        return client.db("dbtest").collection("contacts");
    })
}

app.use(express.json());

app.get('/get-contacts', async (req, res) => {
    try {
        let collection = await getContactCollection();
        const tasks = await collection.find().toArray();
        res.json(tasks);
    } catch (error) { console.error(error); }
});

app.post('/add-contacts', async (req, res) => {
    try {
        await addContact(req.body.name, req.body.phone);
    } catch (error) { console.error(error); }
    res.send("envoyé")
})

app.post('/rem-contacts', async (req, res) => {
    let id = req.body._id;
    try {
        await removeContact(id);
    } catch (error) { console.error(error); }
    res.send("supprimé")
})

async function addContact(name, phone) {
    let collection = await getContactCollection();
    try {
        const task = { name: name, phone: phone };
        await collection.insertOne(task);
    } catch (error) { console.error(error); }
}

async function removeContact(id) {
    let collection = await getContactCollection();
    try {
        await collection.deleteOne({ _id: new ObjectId(`${id}`) });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

app.listen(port, () => {
    console.log("serveur : " + port);
});
