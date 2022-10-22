
import fs from 'fs/promises';

fs.readFile('tariff.json', function(err, data) {
    console.log(err);
});
// fetch('tariff.json')
//   .then(response => response.text())
//   .then(data => {
//   	// Do something with your data
//   	console.log(data);
//   });