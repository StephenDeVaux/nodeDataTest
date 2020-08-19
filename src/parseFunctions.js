const parseCountryRCP = (row, data) => {
    const region = row[0].replace(/\s/g, '').replace('-', '');
    const country = row[1].replace(/\s/g, '').replace('-', '');
    const itemType = row[2].replace(/\s/g, '').replace('-', '');
    const revenue = Number(row[11])
    const totalCost = Number(row[12])
    const totalProfit = Number(row[13])
    if (!data.regions[region]) { data.regions[region] = {} }
    if (!data.regions[region].Countries) { data.regions[region].Countries = {} }
    if (!data.regions[region].Countries[country]) { data.regions[region].Countries[country] = {} }
    if (!data.regions[region].Countries[country].ItemTypes) { data.regions[region].Countries[country].ItemTypes = {} }
    if (!data.regions[region].Countries[country].ItemTypes[itemType]) { data.regions[region].Countries[country].ItemTypes[itemType] = {} }
    if (data.regions[region].Countries[country].ItemTypes[itemType].Revenue) {
        data.regions[region].Countries[country].ItemTypes[itemType].Revenue += revenue
    } else {
        data.regions[region].Countries[country].ItemTypes[itemType].Revenue = revenue
    }
    if (data.regions[region].Countries[country].ItemTypes[itemType].Cost) {
        data.regions[region].Countries[country].ItemTypes[itemType].Cost += totalCost
    } else {
        data.regions[region].Countries[country].ItemTypes[itemType].Cost = totalCost
    }
    if (data.regions[region].Countries[country].ItemTypes[itemType].Profit) {
        data.regions[region].Countries[country].ItemTypes[itemType].Profit += totalProfit
    } else {
        data.regions[region].Countries[country].ItemTypes[itemType].Profit = totalProfit
    }

    if (!data.regions[region].Countries[country].Total) { data.regions[region].Countries[country].Total = {} }
    if (!data.regions[region].Total) { data.regions[region].Total = {} }

    if (!data.regions[region].Countries[country].Total.Revenue) {
        data.regions[region].Countries[country].Total.Revenue = revenue
        data.regions[region].Countries[country].Total.Cost = totalCost
        data.regions[region].Countries[country].Total.Profit = totalProfit
    } else {
        data.regions[region].Countries[country].Total.Revenue += revenue
        data.regions[region].Countries[country].Total.Cost += totalCost
        data.regions[region].Countries[country].Total.Profit += totalProfit
    }
    return data
}

const totalsTask1 = (data) => {
    for (var key in data.regions) {
        if (data.regions.hasOwnProperty(key)) {
            var Total = {
                Revenue: 0,
                Cost: 0,
                Profit: 0,
            }
            for (var key2 in data.regions[key].Countries) {
                if (data.regions[key].Countries.hasOwnProperty(key2)) {
                    Total.Revenue += data.regions[key].Countries[key2].Total.Revenue
                    Total.Cost += data.regions[key].Countries[key2].Total.Cost
                    Total.Profit += data.regions[key].Countries[key2].Total.Profit
                }
            }
            data.regions[key].Total = Total
        }
    }
    return data
}

const itemTotalsTask1 = (data) => {
    var ItemTypes = {
    }

    //Loop Region
    for (var key in data.regions) {
        if (data.regions.hasOwnProperty(key)) {

            //Loop Countries
            for (var key2 in data.regions[key].Countries) {
                if (data.regions[key].Countries.hasOwnProperty(key2)) {

                    //Loop ItemTypes
                    for (var key3 in data.regions[key].Countries[key2].ItemTypes) {
                        if (data.regions[key].Countries[key2].ItemTypes.hasOwnProperty(key3)) {
                            if (!ItemTypes[key3]) {
                                ItemTypes[key3] = {}
                                ItemTypes[key3].Revenue = data.regions[key].Countries[key2].ItemTypes[key3].Revenue
                                ItemTypes[key3].Cost = data.regions[key].Countries[key2].ItemTypes[key3].Cost
                                ItemTypes[key3].Profit = data.regions[key].Countries[key2].ItemTypes[key3].Profit
                            } else {
                                ItemTypes[key3].Revenue += data.regions[key].Countries[key2].ItemTypes[key3].Revenue
                                ItemTypes[key3].Cost += data.regions[key].Countries[key2].ItemTypes[key3].Cost
                                ItemTypes[key3].Profit += data.regions[key].Countries[key2].ItemTypes[key3].Profit
                            }
                        }
                    }
                }
            }

        }
    }
    data.ItemTypes = ItemTypes
    return data
}

const parseYearAndMonth = (row, data2) => {
    const orderDate = row[5]
    var dateSplit = orderDate.split('/');
    const year = dateSplit[2]
    const month = dateSplit[0]
    priority = row[4]
    if (!data2[year]) {
        data2[year] = {}
    }
    if (!data2[year][month]) {
        data2[year][month] =
        {
            L: 0,
            M: 0,
            H: 0,
            C: 0,
            AvgDaysToShip: 0,
            NumberOfOrders: 0,
            TotalOrderDays: 0,
            Regions: {}
        }
    }
    if (priority == "L") {
        data2[year][month].L += 1
    }
    if (priority == "M") {
        data2[year][month].M += 1
    }
    if (priority == "H") {
        data2[year][month].H += 1
    }
    if (priority == "C") {
        data2[year][month].C += 1
    }

    const region = row[0].replace(/\s/g, '').replace('-', '');
    const country = row[1].replace(/\s/g, '').replace('-', '');
    const ordDate = new Date(row[5])
    const shipDate = new Date(row[7])
    var days = Number(((shipDate.getTime() - ordDate.getTime()) / (1000 * 3600 * 24)).toFixed(0));

    if (!data2[year][month].Regions[region]) {
        data2[year][month].Regions[region] = {
            AvgDaysToShip: 0,
            NumberOfOrders: 0,
            TotalOrderDays: 0,
            Countries: {}
        }
    }
    if (!data2[year][month].Regions[region].Countries[country]) {
        data2[year][month].Regions[region].Countries[country] = {
            AvgDaysToShip: 0,
            NumberOfOrders: 0,
            TotalOrderDays: 0,
        }
    }

    data2[year][month].Regions[region].Countries[country].NumberOfOrders += 1
    data2[year][month].Regions[region].Countries[country].TotalOrderDays += days
    data2[year][month].Regions[region].Countries[country].AvgDaysToShip = Number((data2[year][month].Regions[region].Countries[country].TotalOrderDays / data2[year][month].Regions[region].Countries[country].NumberOfOrders).toFixed(1))

    data2[year][month].Regions[region].NumberOfOrders += 1
    data2[year][month].Regions[region].TotalOrderDays += days
    data2[year][month].Regions[region].AvgDaysToShip = Number((data2[year][month].Regions[region].TotalOrderDays / data2[year][month].Regions[region].NumberOfOrders).toFixed(1))

    data2[year][month].NumberOfOrders += 1
    data2[year][month].TotalOrderDays += days
    data2[year][month].AvgDaysToShip = Number((data2[year][month].TotalOrderDays / data2[year][month].NumberOfOrders).toFixed(1))
}


module.exports = {
    parseCountryRCP,
    totalsTask1,
    itemTotalsTask1,
    parseYearAndMonth,
}
