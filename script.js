// This is to get the States

function getStatesData() {
    fetch('https://quietcoolsystems.com/sliderAPI/get-states.php')
        .then((res) => res.json())
        .then((statesData) => {
            let statesOutput = '<option class="top-option">Please Select a State</option>';

            statesData.forEach(function(states) {
                statesOutput += `<option value="${states.state}">${states.state}</option>`;
            });
            document.getElementById("select-state").innerHTML = statesOutput;
        })
}

getStatesData();




// This is to get the Provider onChange

function getProvidersDataOnChange() {

    var stateChoice = document.getElementById("select-state").value;

    if (stateChoice === stateChoice) {
        document.getElementById("select-provider").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-provider.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Provider</option>';
                data.filter(function(provider) {
                    if (stateChoice === provider.states) {
                        output += `<option value="${provider.provider_name}">${provider.provider_name}</option>`;
                        console.log(provider.price_kw);
                    }
                });
                document.getElementById("select-provider").innerHTML = output;
            })
    }
}

// This is to get the Fan onChange

function getFanDataOnChange() {

    var fanChoice = document.getElementById("select-provider").value;

    if (fanChoice) {
        document.getElementById("select-fan").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-fans.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Fan</option>';
                data.forEach(function(fans) {

                    output += `<option value="${fans.fan}">${fans.fan}</option>`;


                });
                document.getElementById("select-fan").innerHTML = output;
            })
    }
}


// This is to get the Fan Models onChange

function getFanModelOnChange() {

    var fanChoiceModel = document.getElementById("select-fan").value;

    if (fanChoiceModel === fanChoiceModel) {
        document.getElementById("select-fan-models").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-fan-models.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Model</option>';
                data.filter(function(fanModel) {

                    if (fanChoiceModel === fanModel.name) {
                        output += `<option value="${fanModel.model}">${fanModel.model}</option>`;
                    }
                });
                document.getElementById("select-fan-models").innerHTML = output;
            })
    }
}



function sliderOnChange() {
    var sliderHoursRange = document.getElementById("slider-hours-range");
    var sliderHoursRangeResults = document.getElementById("slider-hours-results");
    var sliderDayRangeResults = document.getElementById("slider-day-results");
    var sliderMonthResults = document.getElementById("slider-month-results");
    var sliderYearResults = document.getElementById("slider-year-results");
    document.getElementById("slider-and-results-wrapper").style.display = "flex";

    // var fanSelected = document.getElementById("select-fan").value;
    // var providerSelected = document.getElementById("select-provider").value;

    // let arr = [];
    // let allData;

    // allData = () => {
    //     fetch('https://quietcoolsystems.com/sliderAPI/get-fan-models.php')
    //         .then(res => res.json())
    //         .then(data => {
    //             arr = data.filter(info => {
    //                 if (fanSelected === info.model) {
    //                     return info;
    //                 }
    //             })
    //         }).catch(err => {
    //             console.log(err);
    //         })
    // };

    // allData();

}



var fanSelected = document.getElementById("select-fan").value;
var providerSelected = document.getElementById("select-provider").value;

let arr = [];

let allData = () => {
    fetch('https://quietcoolsystems.com/sliderAPI/get-fan-models.php')
        .then(res => res.json())
        .then(data => {
            arr = data.filter(info => {
                if (fanSelected === info.model) {
                    return info;
                }
            })
        }).catch(err => {
            // console.log(err);
        })
};

allData();