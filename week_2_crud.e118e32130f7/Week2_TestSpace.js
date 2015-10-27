db.catalog.find( { "price" : { $gt : 10000 }, { "reviews.rating" : { $gt : 5 } } } );
