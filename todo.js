const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const _=require("lodash")


const app = express();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"));


mongoose.connect("mongodb+srv://disha92200:abacusyoyo92@cluster0.w7pi8.mongodb.net/todolistDB?retryWrites=true&w=majority", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};

const Item = new mongoose.model("Item", itemsSchema);

const item1=new Item({
    name:"Welcome to your todolist!"
})

const item2=new Item({
    name:"Hit the + button to add a new item"
})

const item3=new Item({
    name:"<-- Hit this to delete an item"
})

const listSchema={
    name:String,
    items:[itemsSchema]
}

const List= new mongoose.model("list",listSchema)

app.set('view engine', 'ejs');


app.get("/",(req,res)=>{
    Item.find({},function(err,results){
        if(results.length==0){
            Item.insertMany([item1,item2,item3],(err)=>{
                if(err){
                    console.log(err)
                }
            })
            res.redirect('/')
        }
        else{
            res.render("list", { listtitle: "Today", newListItems: results });
        }
        
    })
});


app.get("/:customListName",(req,res)=>{
    customListName=_.capitalize(req.params.customListName)
    if(!(customListName==="Favicon.ico"))
    {
    List.findOne({name:customListName},(err,result)=>{
       if(!err){
           
            if(!result){
                console.log("doesnt exist added "+customListName+" to list")
               //create list 
                const list=new List({
                    name:customListName,
                    items:[item1,item2,item3]
                })
                list.save((err)=>{
                    res.redirect("/"+customListName)
                });
                
                
            }
            else{
                res.render("list", { listtitle:result.name, newListItems: result.items });
            }
       }
       else{
           console.log(err)
       }
    })

    }
    

})


app.post("/", function (req, res) {

    var item = req.body.newitems;
    var title=req.body.list;
    const newItem=new Item({
        name:item
    })
    if(title==="Today"){
        newItem.save((err)=>{
            res.redirect("/");
        })
        
    }
    else{
        List.findOne({name:title},(err,result)=>{
           result.items.push(newItem)
           result.save((err)=>{
            res.redirect("/"+title)
           });
           
        })
    }
    console.log("inserted successfully")
});



app.post("/delete",(req,res)=>{
   // console.log(req.body)
   listTitle=req.body.listName
   id=req.body.checkbox
   if(listTitle==="Today"){
    Item.deleteOne({_id:id},(err)=>{
        if(!err){
            console.log("Successfully deleted")
        }
        else{
            console.log(err)
        }
        res.redirect("/")
    })
    
   }
   else{
       List.findOneAndUpdate({name:listTitle},{$pull:{items:{_id:id}}},(err,listItem)=>{
           //console.log(listItem)
           if(!err){
            res.redirect("/"+listTitle)
           }
           else{
               console.log(err)
           }
       })
   }
    
})




app.listen(process.env.PORT || 3000, function () {
    console.log("done")
});
