// let theData = [];
// let fan = "Trident Pro 1.5X";
// let provider = "Southern California Edison";


let theArray = [];

function getData() {
    fetch('allData.json')
        .then((res) => res.json())
        .then(data => {
            // console.log(data);
            data.Fans.map(theData => {
                return theArray.push(theData.watts);
            });

        }).catch(error => {
            // console.log(error);
        });
}

getData();

console.log(theArray);