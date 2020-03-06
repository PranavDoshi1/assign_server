var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Orders = require('./orderschema');

router.post('/createorder', async(req,res)=>{
    var{order_no, order_address, total, email} = req.body
    try {
        var order = await Orders.create({
            order_no, order_address, total, email
        })
        res.status(200).send({
            data:order,
            message:'success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            data:error,
            message:'unsuccess'
        })
    }
})


router.post('/payload', async(req, res) => {
    // let Shopify know we received the order details ok
    res.send('OK');
  
    // the body of the data received
    const theData = req.body;
    console.log(theData);
    try {
        var order = await Orders.create({
            email:theData.customer.email,  
            order_id: theData.customer.id,
            phone: theData.customer.phone,
            first_name: theData.customer.first_name,
            last_name: theData.customer.last_name,
            city: theData.customer.default_address.city,
            zip: theData.customer.default_address.zip,
            province: theData.customer.default_address.province,
            country: theData.customer.default_address.country,
            address1: theData.customer.default_address.address1,
            address2: theData.customer.default_address.address2  
        })
    } catch (error) {
        console.log(error)
    }

  });




router.post('/orderlist', async(req,res)=>{
    try{
        var orderlist = await Orders.find({})
        res.status(200).send({
            data:orderlist,
            message:'success'
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            message:'unsuccess',
            data:err
        })   
    }
})

router.post('/orderupdate', async(req,res)=>{
    console.log(req.body)
    var {order_id,email,phone,address1,address2,city,province,country,zip} = req.body
    try {
        var update = await Orders.update({_id: order_id}, {$set:{
            email:email,
            phone:phone,
            address1:address1,
            address2:address2,
            city: city,
            province: province,
            country: country,
            zip: zip
        }})
        res.status(200).send({
            data:update,
            message:'success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            data:error,
            message:'unsuccess'
        })
    }
})

module.exports = router