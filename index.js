//npm init
//npm i express
//npm i mongoose

//Database password:sample 
//Databse: real-estate
//collection  : courses



const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());


//mongodb+srv://samplee:<password>@cluster0.xvaaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const uri = "mongodb+srv://samplee:sample1@cluster0.xvaaa.mongodb.net/real-estate?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//Define a schema
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  name:String,
  author:String,
  tags:[String],
  date:{type:Date, default:Date.now},
  isPublished:Boolean

});

//Class And Object
//Class: Course
//Object: course

//Class
const Course=mongoose.model('Course',courseSchema);
 

async function createCourse()

{ //As await is there so, surrounded by a function


//object to our class
const course = new Course({
    name:'Angular course',
    author:'Mosh',
    tags:['Angular','frontend'], //tags is an array 
    isPublished:true

}); 
const result= await course.save(); //When await is there surround by async function
console.log(result);
}


//QUERYING DOCUMENTS:

async function getCourses(){
  const courses= await Course.find({ author: 'Mosh', isPublished:true })
  //To get all courses from the databse use : Course.find();
  //.find is like a promise => so await it

  //If you wanna display the courses based on author then put that particular object in find() method
  //like these e can add all the queries like sorting it based on name and dispalying the name, id and tags properties 
  .limit(10)
  .sort({name: 1})
  .select({ name:1 , tags: 1}); //Sorting the name of the author based on ascending order
  //if we want to sort it in descending order then we should place "-1" sort(-1);
  
  //we can have any no.of. key-value pairs like these like limit,select, sort....


  console.log(courses);
}
//createCourse();
getCourses();

//COMPARISION QUERY OPERATORS

//eq -> equals
//neq -> not equals
//gt -> greater than
//gte -> greater than or equals

//lt -> less than
//lte -> less than or equals

//in
//nin -> not in

//Let us assume that we have "price" property for each course and want to display the price 10 books 
// we can do this by using 
//.find({price:10})

//To display courses > 10 use the comparision operator as object {} with key value pairs
//.find({price:{$gt: 10 }})
//$ -> to indicate that it is operator

////To display courses between 10  to 20 use the comparision operator as object {} with key value pairs
//.find({price : { $gte: 10, $lte: 20}})

// async function getCourses(){
//   const courses= await Course
//   //.find({price:10})
//   //.find({ price: { $gt : 10 }})
//   //.find({ price: { $gte : 10 , $lte:20 }})
//   //For example to display the price either 10/- or 15/- or 20/- => for that purpose use in operator
//   //.find({ price: {$in : [10,15,20] }})
//   .limit(10)
//   .sort({name: 1})
//   .select({ name:1 , tags: 1}); 
//   console.log(courses);
// }
// getCourses();


//Logical Operators

//or , and

// async function getCourses(){
//   const courses= await Course
//   //.find()
//   //Javascript constructor that we used to store multiple values is "ARRAY[]"
//   //To display author of the course is Mosh or book published is true we use "or" operator
//   .or([ {author: 'Mosh'},{isPublished:true} ])
  
//   //To display author of the course is Mosh and book is published is true  we use "and" operator

//   .and([ {author: 'Mosh'},{isPublished:true} ])


//   .limit(10)
//   .sort({name: 1})
//   .select({ name:1 , tags: 1}); 
//   console.log(courses);
// }
// getCourses();

//Regular Expressions .find({ author: /pattern/ })

// async function getCourses(){
//   const courses= await Course
//   //.find({ author: 'Mosh', isPublished:true }) 
//   // To display the author whose name starts with Mosh  use ^ at beginning
//    .find({ author: /^Mosh/i }) //" i " represents case insensitive
//   // To display the author whose name ends with Mosh  use $ at end
//   .find( { author :/Mosh$/i})
//   // To display the author whose name contains Mosh  i.e. either at beginning or end or in middle use ".*"
//   .find( { author :/.*Mosh.*/i})
//   .limit(10)
//   .sort({name: 1})
//    .select({ name:1 , tags: 1}); 
//   console.log(courses);
// }

//Counting documents
// async function getCourses(){
//   const courses= await Course
//   .find({ author : 'Mosh', isPublished :true})
//   .limit(10)
//   .sort({name: 1})
//   //.select({ name:1 , tags: 1}); 
//   //instead of displaying the data of documents we need to display the count of documents so we use .count()
//   .count();
//   console.log(courses);
// }
// getCourses();



//Pagination
//the method that goes hand-in-hand with limit() is skip()
// async function getCourses(){
//   const pageNumber = 2;
//   const pageSize=10;
  
//   const courses= await Course
//   .find({ author : 'Mosh', isPublished :true})
//   .skip( (pageNumber-1) * pageSize )
//   //formula for pagination is pagenumber-1 * pagesize
//   .limit(10)
//   .sort({name: 1})
//   //.select({ name:1 , tags: 1}); 
//   //instead of displaying the data of documents we need to display the count of documents so we use .count()
//   .count();
//   console.log(courses);
// }
// getCourses();