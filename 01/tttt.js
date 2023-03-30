const testData = {
  region_a: [
    { date: '2022-09-13', count: 4 },
    { date: '2022-09-14', count: 5 },
    { date: '2022-09-16', count: 5 },
  ],
  region_b: [
    { date: '2022-09-11', count: 1 },
    { date: '2022-09-12', count: 2 },
    { date: '2022-09-13', count: 6 },
    { date: '2022-09-14', count: 7 },
  ],
}

const formatData = (lineData = {}) => {
  const getYData = (itemTimes, allData, nowItem, dataType) => {
    if (itemTimes.includes(nowItem)) {
      let tempD = allData[dataType]?.find(tItem => tItem.date === nowItem)
      return tempD?.count || 0
    }
    return 0
  }

  const chartData = {
    xDate: [],
    yAData: [],
    yBData: [],
  }
  const xATimes = lineData.region_a.map(item => item.date);
  const xBTimes = lineData.region_b.map(item => item.date);

  chartData.xDate = Array.from(new Set([...xATimes, ...xBTimes])).sort();

  chartData.xDate.forEach(xItem => {
    chartData.yAData.push(getYData(xATimes, lineData, xItem, 'region_a'))
    chartData.yBData.push(getYData(xBTimes, lineData, xItem, 'region_b'))
  })

  return chartData;
}


const tttt = '23233%';
console.log(tttt.slice(0, -1))

