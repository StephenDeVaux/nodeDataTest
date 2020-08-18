const fs = require('fs');
const parse = require("csv-parse");

const file_path = "./csv/subset.csv"
// const file_path = "./csv/node-data-processing-medium-data.csv"
const file_pathTask1 = "./csv/task1.json"

var data = {
    regions:{},
    ItemTypes:{}
}

const readCSV = () => {
    fs.createReadStream(file_path)
        .pipe(parse({ delimiter: ',' }, parseData));
}

const parseRow = (row) => {
    const region = row[0].replace(/\s/g, '').replace('-', '');
    const country = row[1].replace(/\s/g, '').replace('-', '');
    const itemType = row[2].replace(/\s/g, '').replace('-', '');
    const revenue = Number(row[11])
    const totalCost = Number(row[12])
    const totalProfit = Number(row[13])
    if(!data.regions[region]){ data.regions[region]= {}} 
    if(!data.regions[region].Countries){ data.regions[region].Countries= {}} 
    if(!data.regions[region].Countries[country]){ data.regions[region].Countries[country]= {}} 
    if(!data.regions[region].Countries[country].ItemTypes){ data.regions[region].Countries[country].ItemTypes= {}} 
    if(!data.regions[region].Countries[country].ItemTypes[itemType]){ data.regions[region].Countries[country].ItemTypes[itemType]= {}} 
    if(data.regions[region].Countries[country].ItemTypes[itemType].Revenue){
        data.regions[region].Countries[country].ItemTypes[itemType].Revenue += revenue
    } else { 
        data.regions[region].Countries[country].ItemTypes[itemType].Revenue = revenue
    }
    if(data.regions[region].Countries[country].ItemTypes[itemType].Cost){
        data.regions[region].Countries[country].ItemTypes[itemType].Cost += totalCost
    } else { 
        data.regions[region].Countries[country].ItemTypes[itemType].Cost = totalCost
    }
    if(data.regions[region].Countries[country].ItemTypes[itemType].Profit){
        data.regions[region].Countries[country].ItemTypes[itemType].Profit += totalProfit
    } else { 
        data.regions[region].Countries[country].ItemTypes[itemType].Profit = totalProfit
    }
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
    console.log(csvData.length)
    for( row of csvData){
        parseRow(row)
    }
    // console.log(data)
    console.log(data.regions.Europe.Countries.France)
    // writeJsonFile(data, file_pathTask1)
}


readCSV()





// const row = ['aus', 'china']
// if(region[row[0]]){
//     console.log("is defined")
//     region.aus.booze = 1
// } else {
//     region.aus = 1
// }

// if(region[row[1]]){
//     console.log("is defined")
//     region.chine.booze = 1
// } else {
//     region[row[1]] = {}
//     region.china.booze = 3
// }
// console.log(region)


const add_line_to_end_of_csv_file = async (file_path, array_of_data) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file_path)
            .pipe(parse({ delimiter: ',' }, (err, data) => {
                if (err) {
                    resolve(false);
                    return
                }
                //Loop to ensure size of new array same as existing data
                for (x = array_of_data.length; x < data[0].length; x++) {
                    array_of_data.push("")
                }
                data.push(array_of_data)
                const csvWriter = createCsvWriter({
                    path: file_path,
                });
                csvWriter.writeRecords(data)
                    .then(() => {
                        resolve(true)
                    });
            }));
    })
}

