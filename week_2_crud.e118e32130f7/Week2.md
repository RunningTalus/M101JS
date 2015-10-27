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

```
NumberInt()
```

```
NumberLong()
```

```
newDate() Returns ISODate("2015-10-26T06:44:38.786Z")
```

QUIZ 3 : Which of the following are types available in BSON?

* Strings
* Floating-point numbers (double precision floats)
* Arrays
* Objects (Subdocuments)
* Timestamps

#Inserting Docs

ObjectId - Is intended to be a global unique identifier.

#Introduction to findOne

```
db.people.findOne()
```

#Introduction to find

```
db.people.find()
```

#Querying Using field Selection

```
db.scores.find( { "student" : 19, "type" : "essay" } );
```

```
db.scores.find( { "score" : 50, "type" : "essay" }, { "student" : true, "_id": false } );
```

#Querying Using $gt and $lt

```
db.scores.find( { "score" : { $gt : 95, $lte : 98 }, "type" : "essay" } );
```

```
db.scores.find( { "score" : { $gte : 50 , $lte : 60 } } ); 
```

#Inequalities on Strings

Case-sensitive

```
db.people.find( { "name" : { $lt : "D" } } );
```

```
db.people.find( { "name" : { $lt : "D", $gt : "B" } } );
```

```
db.users.find( { "name" : { $gte : "F" , $lte : "Q" } } );
```

```
db.users.find( { "name" : { $lte : "Q" , $gte : "F" } } );
```

#Using regexes, $exists, $type

Perl Compatible Regular Expressions (PCRE)

```
db.people.find( { "profession" : { $exists : true } } );
{ "_id" : ObjectId("562e4e420235e91c73761862"), "name" : "Jones", "age" : 35, "profession" : "baker" }
{ "_id" : ObjectId("562eb7aa726e87b25dcb9180"), "name" : "Smith", "age" : 30, "profession" : "hacker" }
```

```
db.people.find( { "name" : { $type : 2 } } ); //finds strings per BSON spec
```

```
db.people.find( { "name" : { $regex : "a" } } ); //finds documents with "a" in them
```

```
db.people.find( { "name" : { $regex : "e$" } } ); //finds documents ending in "e"
```

```
db.people.find( { "name" : { $regex : "^A" } } ); //finds strings starting with "A"
```

```
db.people.find( { "name" : { $regex : "q" } } );
```

```
db.people.find( { "email" : { $exists : true } } );
```

```
db.people.find({ "email" : { $exists : true }, "name" : { $regex : "q" } } );
```

#Using $or

Prefix Operator

```
db.people.find({ $or : [ { "name" : { $regex : "e$" } }, { "age" : { $exists : true } } ] } );
```

... means the was incomplete

hit the enter key twice to return to the command prompt 

```
db.scores.find( { $or : [ { "score" : { $lt : 50 } }, { "score" : { $gt : 90 } } ] } ) ;
```

#Using $and

```
db.people.find( { $and : [ { "name" : { $gt : "C" } }, { "name" : { $regex : "a" } } ] } );
```

```
db.people.find( { "name" : { $gt : "C", $regex : "a" } } ); //Same as above, but more performant
```

```
db.scores.find( { "score" : { $gt : 50 }, score : { $lt : 60 } } ); //Finds all documents with a score < 60
```

#Querying Inside Arrays

Polymorphic - searches inside of strings AND arrays

No recursion

```
db.accounts.find( { "favorites" : "pretzels" } );
```

```
db.accounts.find( { "favorites" : "beer", "name" : { $gt : "H" } } );
```

#Using $in and $all
```
db.accounts.find( { "favorites" : { $all : [ "beer" , "pretzels" ] } } );
```

```
db.accounts.find( { "name" : { $in : [ "Howard", "John" ] } } );
```

```
db.users.find( { "friends" : { $all : [ "Joe", "Bob"] }, "favorites" : { $in : [ "running", "pickles" ] } } );
```

#Queries with Dot Notation
```
db.users.find( { "email.work" : "dave@dave.com" } );
```

```
db.catalog.find( { "price" : { "$gt" : 10000 } , "reviews.rating" : { "$gte" : 5 } } );
```

#Querying, Cursors
```
db.people.find();
```

```
cur = db.people.find(); null; 
```

```
cur.hasNext(); //Returns true
```

```
cur.next(); //Returns the next document
```

```
while (cur.hasNext()) printjson(cur.next());
```

```
cur = db.people.find(); null; 
```

```
cur.limit(5); null;
```

```
cur.sort( { name : -1} ); null;
```

```
cur.sort( { name : -1} ).limit(3); null;
```

```
cur.sort( { name : -1} ).limit(3).skip(2); null;
```

QUIZ : When can you change the behavior of a cursor, by applying a sort, skip, or limit to it?

ANSWER: This can be done at any point before the first document is called and before you've checked to see if it is empty

#Counting Results

```
db.scores.count( { "type" : "exam" } ); 
```

```
db.scores.count( { $and : [ { "type" : "essay" }, { "score" : { $gt : 90 } } ] } ); //$and is not used that much, less performant than solution below.
```

```
db.scores.count( { "type" : "essay", "score" : { "$gt" : 90 } } ); //Same as above.
```

#Wholesale Updating of a Document

```
db.people.update( { "name" : "Smith"} , { "name" : "Thompson", "salary" : 50000 } );
```

Wholesale replacement

Update discards initial values, and updates the document with the properties and values supplied.

#Using the $set Command

$set adds or modifies a field in a document
```
db.people.update( { "name" : "Alice" }, { "$set" : { "age" : 30 } } ); //$set is efficient
```

$inc modifies a field in a document by incrementing it. 

If the document doesn't exist, it will create a new document with the properties and values provided.

```
db.people.update( { "name" : "Alice" }, { "$inc" : { "age" : 1 } } );
```

```
db.users.update( { "_id" : "myrnarackham"}, { "$set" : { "country" : "RU" } } );
```

#Using the $unset Command

```
db.people.update( { "name" : "Jones" }, { "$unset" : { "profession" : 1 } } );
```

```
db.users.update( { "_id" : "jimmy" }, { "$unset" : { "interests" : [] } } );
```

```
db.users.update( { "_id" : "jimmy" }, { "$unset" : { "interests" : 1 } } ); //Preferred answer, same result as above
```

#Using $push, $pop, $pull, $pullAll, $addToSet

Operators that manipulate arrays in documents


###### $set
```
db.arrays.insert( { "_id" : 0, "a" : [ 1, 2, 3, 4 ] } );
```

```
db.arrays.update( { "_id" : 0 }, { $set : { "a.2" : 5 } } ); // $set with the property and array index location replaces the item with the specified value 
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 1, 2, 5, 4 ] }
```

###### $push

```
db.arrays.update( { "_id" : 0 }, { "$push" : { "a" : 6 } } ); //pushes 6 to the end of the []
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 1, 2, 5, 4, 6 ] }
```

###### $pop

```
db.arrays.update( { "_id" : 0 }, { "$pop" : { "a" : 1 } } ); //pop removes the last item in the []
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 1, 2, 5, 4 ] }
```

```
db.arrays.update( { "_id" : 0 }, { "$pop" : { "a" : -1 } } ); //-pop value removes the first item in the []
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 2, 5, 4 ] }
```

###### $pushAll

```
db.arrays.update( { "_id" : 0 }, { "$pushAll" : { "a" : [ 7, 8, 9 ] } } ); //$pushAll pushes new array values to the end of the existing []
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 2, 5, 4, 7, 8, 9 ] }
```

###### $pull

```
db.arrays.update( { "_id" : 0 }, { "$pull" : { "a" : 5 } } ); //$pull removes the specified item from the existing array
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 2, 4, 7, 8, 9 ] }
```

###### $pullAll

```
db.arrays.update( { "_id" : 0 }, { "$pullAll" : { "a" : [ 2, 4, 8 ] } } );
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 7, 9 ] }
```

###### $addToSet

```
db.arrays.update( { "_id" : 0 }, { "$addToSet" : { "a" : 5 } } );
```

```
> db.arrays.find();
```

```
{ "_id" : 0, "a" : [ 7, 9, 5 ] }
```

QUIZ

```
db.friends.insert( { _id : "Mike", interests : [ "chess", "botany" ] } );
```

```
db.friends.update( { _id : "Mike" }, { $push : { interests : "skydiving" } } ); // adds skydiving to the end of the []
```

```
> db.friends.find();
```

```
{ "_id" : "Mike", "interests" : [ "chess", "botany", "skydiving" ] }
```

```
db.friends.update( { _id : "Mike" }, { $pop : { interests : -1 } } ); // removes chess from the beginning of the []
```

```
> db.friends.find();
```

```
{ "_id" : "Mike", "interests" : [ "botany", "skydiving" ] }
```

```
db.friends.update( { _id : "Mike" }, { $addToSet : { interests : "skydiving" } } ); // no change
```

```
> db.friends.find();
```

```
{ "_id" : "Mike", "interests" : [ "botany", "skydiving" ] }
```

```
db.friends.update( { _id : "Mike" }, { $pushAll: { interests : [ "skydiving" , "skiing" ] } } ); // pushes skydiving and skiing to the end of the [], adding skydiving again to the array
```

```
> db.friends.find();
```

```
{ "_id" : "Mike", "interests" : [ "botany", "skydiving", "skydiving", "skiing" ] }
```

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










    
  