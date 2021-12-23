const express = require("express");
const bodyparser = require("body-parser");
const date=require(__dirname +"/date.js");
const app = express();






app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.get("/", function (req, res) {
   
    let day= date();
    res.render("list", {listtitle : day, newListItems: items });
    console.log(items)
});
    app.post("/", function (req, res) {

        var item = req.body.newitems;
        if(req.body.list=="Work"){ 
            workitems.push(item);
            res.redirect("/work");
        }else{ 
            items.push(item);
       
            res.redirect("/");
        }
      

    });
 app.get("/work",function(req,res){
     res.render("list",{listtitle:"Work List", newListItems:workitems});
 });
 app.post("/work",function(req,res)
 {
     let item= req.body.newitems;
     workitems.push(item);
     res.redirect("/work");
 })   
 app.get("/about",function(req,res){
  res.render("about")
 })


app.listen(3000, function () {
    console.log("done")
});
