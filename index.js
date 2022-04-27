const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.MY_USENAME}:${process.env.MY_PASSWORD}@cluster0.w49it.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('user pass charao connect dekhey!LOL ')
/* client.connect(err => {
    console.log('user pass charao connect dekhey!LOL ')
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
async function run() {
    try {
      await client.connect();
      const serviceCollection = client.db('genusCar').collection('services');
  
      app.get('/zakhushi', async (req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });
      app.get('/zakhushi/:id', async(req,res) =>{

          const id = req.params.id;
          const query ={_id: ObjectId(id)};
          const service = await serviceCollection.findOne(query);
          res.send(service);
      });
      app.post('/zakhushi', async(req,res) =>{
          const newService = req.body;
          const result = await serviceCollection.insertOne(newService);
          res.send(result);
      })
      //delete for ManageServices.js
      app.delete('/zakhushi/:id', async(req,res) =>{
        const id=req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
      });
    } 
    finally {
  
    }
  }
  
  run().catch(console.dir);


//root
app.get('/', (req, res) => {
    res.send('Eita Browser a dekhabe');
  });
  app.listen(port, () => {
    console.log('Eita command prompt e dekhebe [listen]', port);
  });
  