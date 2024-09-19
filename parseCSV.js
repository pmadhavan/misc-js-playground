const csvString = `
id,name,age,city
1,John Doe,25,New York
2,Jane Smith,30,Los Angeles
3,Bob Johnson,22,Chicago
`;

/**
 * 
 * [
    { id: '1', name: 'John Doe', age: '25', city: 'New York' },
    { id: '2', name: 'Jane Smith', age: '30', city: 'Los Angeles' },
    { id: '3', name: 'Bob Johnson', age: '22', city: 'Chicago' }
]
 */

class Person {
  constructor(id, name, age, city) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

class people {
  constructor() {
    this.people = [];
  }
}

const parseCSV = (csvString) => {
  let people = [];
  const newPerson = {
    id: '',
    name: '',
    age: '',
    city: '',
  };
  // create variable to store properties
  // split with new line as lines
  // map through lines
  // words split each line with comma
  // if index ===0
  // set properties = words
  // for each word
  // newObject[prop[index]] = word
  if (csvString) {
    const lines = csvString.split('\n');
    let keys;
    people = lines.map((line, index) => {
      if (line) {
        if (index === 0) {
          keys = line.split(',');
        }
        console.log('keys', keys.length);
        if (index > 0) {
          const words = line.split(',');
          const obj = words.reduce((newObj, word, id) => {
            newObj[keys[id]] = word;
            return newObj;
          }, {});
          return obj;
        }
      }
    });
  }
  return people;
};

//console.log(parseCSV(''));

//console.log(parseCSV('id,name,age,city'));

console.log(
  parseCSV(`id,name,age,city
1,John Doe,25,New York
2,Jane Smith,30,Los Angeles
3,Bob Johnson,22,Chicago`)
);
