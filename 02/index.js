function towSum(nums, target) {
 let tempResult = []

  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];

    if (element + nums[i+ 1]) {
      tempResult = [nums[i],
        nums[i+1]]
      return
    }
  }
  return tempResult

}


const result = towSum([1, 2, 3, 4], 5);

console.log('result: ', result);