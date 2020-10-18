const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Comment = require('../models/Comment')
const authMiddleware = require("../middleware/authMiddleware");
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1092374',
  key: '16ca3006a08827062073',
  secret: 'd68755f8ef8b5528389a',
  cluster: 'eu',
  useTLS: true,
});


//create comments
router.post("/add",authMiddleware,(req,res)=>{
    let newComent = new Comment({
      content:req.body.content,
      postedBy:req.body.postedBy,
      event:req.body.event
   
    })
   
     newComent.save()
     .then(com=>{
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });
      
      res.status(201).send(com)
      })
     .catch(err=>res.status(402).send(err.message))
   })
   
   //get comments
   router.get("/",(req,res)=>{
    Comment.find()
    .then(com=>res.status(200).send(com))
    .catch((err)=>res.status(402).send(err.message))
   })


   //Edit comment
   router.put("/edit/:commentId",authMiddleware,(req,res)=>{
     Comment.findOneAndUpdate({
       _id:req.params.commentId
     },{content:req.body.newContent},
     {
       new:true,
       runValidators:true
     })
     .then(com=>{
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });   
      res.status(202).send(com)
    })
     .catch(err=>res.status(404).send(err.message))
   })


   //delete comment 
   router.delete("/delete/:commentId",authMiddleware,(req,res)=>{
     Comment.findOneAndRemove({_id:req.params.commentId})
     .then(del=> {
      pusher.trigger('my-channel', 'my-event', {
        'message': 'hello world'
      });
      res.send({ msg: "comment Deleted!" })
    })
     .catch(err=>res.status(404).send(err.message))
   
   })

//reply

router.put("/add/reply/:commentId",authMiddleware,(req,res)=>{
  Comment.findOneAndUpdate({
    _id:req.params.commentId
  },{$push: {reply:req.body}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });  
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

 //Edit reply
//  router.put("/edit/reply/:commentId",authMiddleware,(req,res)=>{
//   Comment.findOne({
//     _id:req.params.commentId
//   })
//   .then(com=>{
//     com.reply.find(el=>el.id==req.body.id_reply).content=req.body.newContent
      
//       com.save((err,newrep)=>{
//         if(err)
//         throw err
//         console.log(newrep);res.status(202).send(newrep)})
    
// console.log(com)
//   })
//   .catch(err=>res.status(404).send(err.message))
// })
router.put("/edit/reply/:commentId",authMiddleware,(req,res)=>{
  Comment.findOneAndUpdate(
    {_id:req.params.commentId,"reply.id":req.body.id_reply}
  ,{$set:{"reply.$.content":req.body.newContent}},
  {
    new:true,
    runValidators:true
  })
  .then(com=>{
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
    res.status(202).send(com)
  })
  .catch(err=>res.status(404).send(err.message))
})

 //delete reply 
 router.put("/delete/reply/:commentId",authMiddleware,(req,res)=>{
 console.log(req.body)
  Comment.findOneAndUpdate({_id:req.params.commentId},{$pull:{reply:{id:req.body.reply_id}}})
  .then(del=> {
    pusher.trigger('my-channel', 'my-event', {
      'message': 'hello world'
    });
     res.send({ msg: "reaction Deleted!" })})
  .catch(err=>res.status(404).send(err.message))

})
   module.exports= router