// var sliderHoursRange = document.getElementById("slider-hours-range");
// var sliderHoursRangeResults = document.getElementById("slider-hours-results");
// var sliderDayRangeResults = document.getElementById("slider-day-results");
// var sliderMonthResults = document.getElementById("slider-month-results");
// var sliderYearResults = document.getElementById("slider-year-results");


// sliderHoursRange.oninput = function() {
//     sliderHoursRangeResults.innerHTML = this.value;

//     let arr = [];

//     let allData = () => {
//         fetch('https://quietcoolsystems.com/sliderAPI/get-all-data.php')
//             .then(res => res.json())
//             .then(data => data.forEach(element => arr.push(element)))
//         console.log(arr)
//     }

//     allData();

//     document.getElementById("fanWatts").innerHTML = arr[0];
// }