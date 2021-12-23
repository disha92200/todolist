module.exports=getdate;

function getdate(){
    var today = new Date();
var options = {
    weekday: "long",
    day: "numeric",
    month: "long"

};
//abar var day na niye ekebare return today.toLocaleDateString("en-US", options); 
//likhleo hoto
var day = today.toLocaleDateString("en-US", options);
return day;
}