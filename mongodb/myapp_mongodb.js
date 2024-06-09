// includes
require('dotenv').config();

// activate mongoose
mongoose = require('mongoose');
mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// included code
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person =  mongoose.model('Person', personSchema);

// included code
const createAndSavePerson = (done) => {
  const personData = new Person(
    { 'name': "name", 
      'age': 10,
      'favoriteFoods': "food"
    }
  );
  personData.save(
    function(error, data) { // error handler
      if(error) {
        console.log("failed to save");
      } else {
        done(null, data); // store info
      }
    }
  );
  //done(null /*, data*/);
};

// Array of people
const arrayOfPeople = [
  { 'name': "name1", 
    'age': 1,
    'favoriteFoods': "food1"
  },
  { 'name': "name2", 
    'age': 2,
    'favoriteFoods': "food2"
  },
  { 'name': "name3", 
    'age': 3,
    'favoriteFoods': "food3"
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, 
    function( error, data ) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
    }
)};

// identify person
const findPeopleByName = (personName, done) => {
  Person.find( {'name': personName}, 
    function( error, data ) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
    }
)};

// find object with value
const findOneByFood = (food, done) => {
  Person.findOne( {'favoriteFoods': food}, 
    function( error, data ) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
  });
};

// find object with specific unique identifier
const findPersonById = (personId, done) => {
  Person.findById( {'_id': personId}, 
    function( error, data ) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
  });
};

// store data
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById( {'_id': personId },
    function( error, data ) {
      if(error) {
        console.log(error);
      } else {
        // update data
        data.favoriteFoods.push(foodToAdd);
        console.log(data);
        
        // save data
        data.save(
          function(error, data) { // error handler
            if(error) {
              console.log("failed to save");
            } else {
              done(null, data); // store info
            }
          }  
        );
      }
    }
  );
};

// update entry given a name
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {'name': personName }, // filter
    { 'age': ageToSet  },  // update
    { new: true },         // options
    function(err, data) { 
      if(err) { 
          console.log(err) 
      } else { 
          console.log(data); 
          done(null, data);
      } 
    });
};

// delete single document
const removeById = (personId, done) => {
  Person.findByIdAndRemove( {'_id': personId}, 
    function(error, data) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
    }
  );
};

// delete multiple entries
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove( {'name': nameToRemove}, 
    function(error, data) {
      if(error) {
        console.log(error);
      } else {
        done(null, data);
      }
    }   
  );
};

// combine commands
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find( {'favoriteFoods': foodToSearch} )
  .sort( {'name': 1} )
  .limit(2)
  .select( {'name': 1, '_id': 0, 'age': 0} )
  .exec(
    function( error, data ) {
      if(error) {
        return done(error);
      } else {
        console.log(data);
        return done(null, data);
      }
    }
  );

  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
