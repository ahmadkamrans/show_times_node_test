const { writeFile, readFile } = require('fs');
const path = './movies.json';


async function create(req){
  const movie = req;
  readFile(path, (error, data) => {
    if (data.length == 0) {
      var parsedData = []
    } else {
      var parsedData = JSON.parse(data);
    }

    if (error) {
      console.log(error);
      return;
    }
    console.log(error);

    console.log(parsedData)
    parsedData.push(movie)
    parsedData.createdAt = new Date().toISOString();
    console.log(parsedData)
    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log('Failed to add movie');
        return;
      }
      console.log('Movie added successfully');
    });
  });
}

module.exports = {
  create
}