#CRUD & the Mongo Shell

## Node.js
* Create
* Read 
* Update
* Delete

## SQL
* INSERT
* SELECT
* UPDATE
* DELETE

##Mongo
* **Insert**
* **Find**
* **Update**
* **Remove**

MongoDB's CRUD operations exist as methods/functions in programming language API's not as a separate language.

QUIZ 1: By the end of this week, you'll know which of the following?
 
* MongoDB's basic document creation, retrieval, modification, and removal operations.
* Some features of the MongoDB shell, mongo.
* How to manipulate MongoDB documents from a language.

#Secrets of the Mongo Shell

#BSON Introduced

[Binary JSON](http://www.bsonspec.org) - Superset of JSON

NumberInt()
NumberLong()
newDate() Returns ISODate("2015-10-26T06:44:38.786Z")

QUIZ 3 : Which of the following are types available in BSON?

* Strings
* Floating-point numbers (double precision floats)
* Arrays
* Objects (Subdocuments)
* Timestamps

#Inserting Docs

ObjectId - Is intended to be a global unique identifier.

#Introduction to findOne

db.people.findOne()

#Introduction to find
db.people.find()

#Querying Using field Selection
db.scores.find( { "student" : 19, "type" : "essay" } );
db.scores.find( { "score" : 50, "type" : "essay" }, { "student" : true, "_id": false } );

#Querying Using $gt and $lt
db.scores.find( { "score" : { $gt : 95, $lte : 98 }, "type" : "essay" } );
db.scores.find( { "score" : { $gte : 50 , $lte : 60 } } ); 

#Inequalities on Strings
db.people.find( { "name" : { $lt : "D" } } );
db.people.find( { "name" : { $lt : "D", $gt : "B" } } );

db.users.find( { "name" : { $gte : "F" , $lte : "Q" } } );
db.users.find( { "name" : { $lte : "Q" , $gte : "F" } } );
Case-sensitive

#Using regexes, $exists, $type
libpcre
 db.people.find( { "profession" : { $exists : true } } );
{ "_id" : ObjectId("562e4e420235e91c73761862"), "name" : "Jones", "age" : 35, "profession" : "baker" }
{ "_id" : ObjectId("562eb7aa726e87b25dcb9180"), "name" : "Smith", "age" : 30, "profession" : "hacker" }

db.people.find( { "name" : { $type : 2 } } ); //finds strings per BSON spec
db.people.find( { "name" : { $regex : "a" } } ); //finds documents with "a" in them
db.people.find( { "name" : { $regex : "e$" } } ); //finds documents ending in "e"
db.people.find( { "name" : { $regex : "^A" } } ); //finds strings starting with "A"

db.people.find( { "name" : { $regex : "q" } } );
db.people.find( { "email" : { $exists : true } } );
db.people.find({ "email" : { $exists : true }, "name" : { $regex : "q" } } );

#Using $or
Prefix Operator
  db.people.find({ $or : [ { "name" : { $regex : "e$" } }, { "age" : { $exists : true } } ] } );

... means the was incomplete
hit the enter key twice to return to the command prompt 

db.scores.find( { $or : [ { "score" : { $lt : 50 } }, { "score" : { $gt : 90 } } ] } ) ;

#Using $and
db.people.find( { $and : [ { "name" : { $gt : "C" } }, { "name" : { $regex : "a" } } ] } );
db.people.find( { "name" : { $gt : "C", $regex : "a" } } ); //Same as above, but more performant

db.scores.find( { "score" : { $gt : 50 }, score : { $lt : 60 } } ); //Finds all documents with a score < 60

#Querying Inside Arrays
Polymorphic - searches inside of strings AND arrays
No recursion
db.accounts.find( { "favorites" : "pretzels" } );
db.accounts.find( { "favorites" : "beer", "name" : { $gt : "H" } } );

#Using $in and $all
db.accounts.find( { "favorites" : { $all : [ "beer" , "pretzels" ] } } );
db.accounts.find( { "name" : { $in : [ "Howard", "John" ] } } );
db.users.find( { "friends" : { $all : [ "Joe", "Bob"] }, "favorites" : { $in : [ "running", "pickles" ] } } );

#Queries with Dot Notation
db.users.find( { "email.work" : "dave@dave.com" } );
db.catalog.find( { "price" : { "$gt" : 10000 } , "reviews.rating" : { "$gte" : 5 } } );

#Querying, Cursors

#Counting Results

#Wholesale Updating of a Document

#Using the $set Command

#Using the $unset Command

#Using $push, $pop, $pull, $pullAll, $addToSet

#Upserts

#Multi-update

#Removing Data

#Node.js Driver: find, findOne, and cursors

#Node.js Driver: Using Field Projection

#Node.js Driver: Using $gt and $lt

#Importing Reddit

#Node.js Driver: Using $regex

#Node.js Driver: Using Dot Notation

#Node.js Driver: Skip, Limit and Sort

#Node.js Driver: Inserting, _id

#Node.js Driver: Updating

#Node.js Driver: Upserts

#Node.js Driver: findAndModify

#Node.js Driver: Remove










    
  