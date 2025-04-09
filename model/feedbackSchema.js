const mongoose =require("mongoose");

const FeedbackSchema=mongoose.Schema({ 
        title:String,
        description:String,
        name:String
});

const Feedbacks=mongoose.model('Feedback',FeedbackSchema);

module.exports=Feedbacks;