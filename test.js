const uuids = ['11', '22', '33', '44'];
const allDatas = [
  {
    uuid: '11',
    type: 'one',
  }, {
    uuid: '22',
    type: 'two',
  }, {
    uuid: '33',
    type: 'three',
  }, {
    uuid: '44',
    type: 'four',
  },
];

const fixData = (type, allIds, allData) => {
  const resultData = allData.filter(item => item.type !== type)
  const resultIds = resultData.map(item => item.uuid)

  console.log('resultData: ', resultData)
  console.log('resultIds: ', resultIds)
}

fixData('two', uuids, allDatas);




















