const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const FeedbackHandler=require('./routers/FeedbackHandler');
const LoginHandler=require('./routers/LoginHandler');
const SignupHandler=require('./routers/SignupHandler');

require('dotenv').config();
const app = express();
const port = 8080;
const DATABASE=process.env.DATABASE;

app.use(cors());
app.use(express.json());


mongoose
    .connect(DATABASE,
    {
        useNewUrlParser : true,
        useUnifiedTopology:true,
    }).then(()=>(console.log("Successfully connected")))
    .catch((err)=>(console.log(err)));


app.get('/', (req, res) => {
    console.log(req.body)
  res.send('Hello, World! 🌍');
});

app.use('/feedback/',FeedbackHandler);
app.use('/login',LoginHandler);
app.use('/signup',SignupHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
