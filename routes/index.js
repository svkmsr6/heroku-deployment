const express = require('express');
const Joi = require('joi');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.resolve(__dirname, '../db/svk-app.db'),function(err){
  if(err){
    console.log('DB Connection failed', err);
  } else {
    console.log('Connected to DB');
  }
});
const router = express.Router();

const reqSchema = Joi.object().keys({
  id:Joi.number().integer().required(),
  rating:Joi.number().less(5.0).greater(0.0).required()
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'SVK Cabbie' });
});

router.patch('/drivers',function(req,res){
   const {body} = req;
   const {error} = Joi.validate(body, reqSchema);
   if(error){
       return res
       .status(400)
       .send({
           status:'bad request', 
           msg:error
       });
   } else {
       const {id, rating} = body;
       db.run('update drivers set rating=? where id=?',[rating, id], function(err){
           if(err){
               return res
               .status(500)
               .send({
                   status:'error', 
                   msg:err.message
               }); 
           } else {
               res
               .status(200)
               .send({
                   status:'success', 
                   msg:`Record with id ${id} updated`
               }); 
           }
       });
    }
});

router.get('/drivers',function(req,res){
     //db.serialize(function(){
       db.all(
           "SELECT * FROM drivers", 
           function(err, rows) {
               if(err) {
                  return res
                   .status(500)
                   .send({
                       status:'error', 
                       msg:err.message
                   });
               }
               if(!rows || rows.length === 0){
                   res.status(404).send({
                       status:'error', 
                       msg:'List of drivers not found',
                       results: rows
                   });
               } else {
                   res.status(200).send({
                       status:'success', 
                       msg:`Retrieved list of ${rows.length} driver(s)`, 
                       results: rows
                   });

               } 
        });              
   //});   
   
});

router.get('/drivers/:id',function(req,res){
   const {id} = req.params;
   db.get("select * from drivers where id=?",id, function(err,row){
       if(err) {
           return res
           .status(500)
           .send({
               status:'error', 
               msg:err.message
           });
       }
       if(!row){
           res.status(404).send({status:'error', msg:`Driver not found`, result: row}); 
       } else {
           res.status(200).send({status:'success', msg:`Retrieved driver`, result: row});   
       }        
   });   
   
});

module.exports = router;
