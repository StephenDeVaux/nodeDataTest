const fs = require('fs');
const parse = require("csv-parse");
const { parseCountryRCP, totalsTask1, itemTotalsTask1, parseYearAndMonth } = require('./parseFunctions')

// const file_path = "./csv/subset.csv"
const file_path = "./csv/node-data-processing-medium-data.csv"
const file_pathTask1 = "./results/task1.json"
const file_pathTask2 = "./results/task2.json"
const file_pathTask3 = "./results/task3.json"

var data = {
    regions: {},
    ItemTypes: {}
}
var data2 = {}

const readCSV = () => {
    fs.createReadStream(file_path)
        .pipe(parse({ delimiter: ',' }, parseData));
}

const writeJsonFile = (object, fileName) => {
    let data = JSON.stringify(object);
    fs.writeFileSync(fileName, data);
}

const parseData = (err, csvData) => {
    if (err) {
        console.log('Error reading CSV file1', err)
        return
    }
    console.log("Number of rows - ",csvData.length)
    console.timeEnd("read file")

    console.time("process file");
    for (row of csvData) {
        parseCountryRCP(row, data)
        parseYearAndMonth(row, data2)
    }
    totalsTask1(data)
    itemTotalsTask1(data)
    console.timeEnd("process file")

    console.time("write file");
    writeJsonFile(data, file_pathTask1)
    writeJsonFile(data2, file_pathTask2)
    writeJsonFile(data2, file_pathTask3)
    console.timeEnd("write file")
    console.log('Complete')
}

console.time("read file");
readCSV()