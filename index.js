require('dotenv').config()
const cors = require("cors");
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT||8888;
const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)
const app= express();
app.use(cors());
app.use(express.json());




const uri = `mongodb://${process.env.DB_User}:${process.env.Use_Password}@ac-dzczvnk-shard-00-00.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-01.4kc4xcj.mongodb.net:27017,ac-dzczvnk-shard-00-02.4kc4xcj.mongodb.net:27017/?ssl=true&replicaSet=atlas-dehx9a-shard-0&authSource=admin&retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});






async function run() {
    try {
  
     
      const SheikhVilla=client.db("SheikhVilla");
      const AllApartment=SheikhVilla.collection("AllApartment");
      const AllUsers=SheikhVilla.collection("AllUsers");
      const Agreement=SheikhVilla.collection("Agreement");
      const AllCoupon=SheikhVilla.collection("AllCoupon");
      const AllAnnouncement=SheikhVilla.collection("AllAnnouncement");
      const AllPayment=SheikhVilla.collection("AllPayment");
  
      app.get("/AllApartment", async(req,res)=>
      {
        const cursor = AllApartment.find();
        const result=await cursor.toArray();
        res.send(result);
      });

      app.post("/Agreement", async (req, res)=> 
      {

          const Apartment= req.body;
          console.log(Apartment)
          const result= await Agreement.insertOne(Apartment);
          console.log(result)
          res.send(result);
  
      });

      app.post("/AllPayment", async (req, res)=> 
      {

          const payment= req.body;
          console.log(payment)
          const result= await AllPayment.insertOne(payment);
          console.log(result)
          res.send(result);
  
      });

      app.post("/AllUsers", async (req, res)=> 
      {

          const User= req.body;
          console.log(User)
          const result= await AllUsers.insertOne(User);
          console.log(result)
          res.send(result);
  
      });
      app.post("/AllCoupon", async (req, res)=> 
      {

          const Coupon= req.body;
          console.log(Coupon)
          const result= await AllCoupon.insertOne(Coupon);
          console.log(result)
          res.send(result);
  
      });
      app.post("/AllAnnouncement", async (req, res)=> 
      {

          const Announcement= req.body;
          console.log(Announcement)
          const result= await AllAnnouncement.insertOne(Announcement);
          console.log(result)
          res.send(result);
  
      });

      app.get("/AllPayment", async(req,res)=>
      {
        const cursor = AllPayment.find();
        const result=await cursor.toArray();
        res.send(result);
      });

      app.get("/Agreement", async(req,res)=>
      {
        const cursor = Agreement.find();
        const result=await cursor.toArray();
        res.send(result);
      });


      app.get("/AllCoupon", async(req,res)=>
      {
        const cursor = AllCoupon.find();
        const result=await cursor.toArray();
        res.send(result);
      });

      app.get("/AllAnnouncement", async(req,res)=>
      {
        const cursor = AllAnnouncement.find();
        const result=await cursor.toArray();
        res.send(result);
      });


      app.get("/AllUser", async(req,res)=>
      {
        const cursor = AllUsers.find();
        const result=await cursor.toArray();
        res.send(result);
      });

      app.delete('/User/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await AllUsers.deleteOne(filter);
        res.send(result);
        
    })
    

    app.delete('/Agreement/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await Agreement.deleteOne(filter);
      res.send(result);
      
  })

  app.delete('/AllCoupon/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await AllCoupon.deleteOne(filter);
    res.send(result);
    
})




  app.patch("/User/:id", async(req,res)=>
  {
    const id=req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
            const updatedUser= req.body;

            const NewUser= {
                $set: {
                  
                  role : updatedUser.role,
                }
            }
            console.log(NewUser)

            const result = await AllUsers.updateOne(filter, NewUser);
            res.send(result);
  })

  app.patch("/Apartment/:id", async(req,res)=>
  {
    const id=req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
            const updatedApartment= req.body;

            const NewApartment= {
                $set: {
                  
                  status : updatedApartment.status,
                }
            }
            console.log(NewApartment)

            const result = await AllApartment.updateOne(filter, NewApartment);
            res.send(result);
  })

  app.patch("/Agreement/:id", async(req,res)=>
  {
    const id=req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
            const updatedAgreement= req.body;

            const NewAgreement= {
                $set: {
                  
                  status : updatedAgreement.status,
                }
            }
            

            const result = await Agreement.updateOne(filter, NewAgreement);
            res.send(result);
  })

  app.patch("/AcceptAgreement/:id", async(req,res)=>
  {
    const id=req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
            const updatedAgreement= req.body;

            const NewAgreement= {
                $set: {
                  
                  status : updatedAgreement.status,
                  Accept_date : updatedAgreement.Accept_date
                }
            }
            

            const result = await Agreement.updateOne(filter, NewAgreement);
            res.send(result);
  })


  app.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price*100);
    console.log(amount, 'amount inside the intent')

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  });


  
  
   
  
    
    } finally {
      // // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  
  
  
  app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  
  app.listen(port, () => {
      console.log(`My Server is running on port: ${port}`)
  })