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

    console.log(stateChoice);

    if (stateChoice === stateChoice) {
        document.getElementById("select-provider").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-provider.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Provider</option>';
                data.filter(function(provider) {
                    if (stateChoice === provider.states) {
                        output += `<option value="${provider.provider_name}">${provider.provider_name}</option>`;
                        // console.log(provider.price_kw);
                    }

                });
                document.getElementById("select-provider").innerHTML = output;
            })
    }
}

// This is to get the Fan onChange

function getFanDataOnChange() {

    var fanChoice = document.getElementById("select-provider").value;

    console.log(fanChoice);

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
    console.log(fanChoiceModel);

    if (fanChoiceModel === fanChoiceModel) {
        document.getElementById("select-fan-models").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-fan-models.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Model</option>';
                data.filter(function(fanModel) {

                    if (fanChoiceModel === fanModel.name) {
                        output += `<option value="${fanModel.model}">${fanModel.model}</option>`;
                        // console.log(fanChoiceModel);
                    }
                });
                document.getElementById("select-fan-models").innerHTML = output;
            })
    }
}

function showSlider() {
    document.getElementById("slider-and-results-wrapper").style.display = "flex";

    var fanModel = document.getElementById("select-fan-models").value;
    console.log(fanModel);

    let FanArray = [];
    let ProviderArray = [];


    const grabData = async() => {
        const response = await fetch('allData.json');
        const data = await response.json();
        FanArray = data.Fans.map(item => item);
        ProviderArray = data.Providers.map(itemProv => itemProv);
        var theFanResult = document.getElementById("select-fan-models").value;
        var theProviderResult = document.getElementById("select-provider").value;
        testRes(theFanResult, theProviderResult);
    }
    grabData();

    const testRes = (fan, provider) => {
        let fanResult = FanArray.filter(item => item.model === fan ? item : null);
        let provResult = ProviderArray.filter(itemProv => itemProv.provider_name === provider ? itemProv : null);

        var sliderHoursRange = document.getElementById("slider-hours-range");
        var sliderHoursRangeResults = document.getElementById("slider-hours-results");
        var sliderDayRangeResults = document.getElementById("slider-day-results");
        var sliderMonthRangeResults = document.getElementById("slider-month-results");
        var sliderYearRangeResults = document.getElementById("slider-year-results");

        sliderHoursRange.oninput = function() {
            sliderHoursRangeResults.innerHTML = this.value;
            sliderDayRangeResults.innerHTML = "$" + Math.round(fanResult[0].watts / 1000 * this.value * provResult[0].price_kw * 100) / 100;
            sliderMonthRangeResults.innerHTML = "$" + Math.round(fanResult[0].watts / 1000 * 30 * this.value * provResult[0].price_kw * 100) / 100;
            sliderYearRangeResults.innerHTML = "$" + Math.round(fanResult[0].watts / 1000 * 365 * this.value * provResult[0].price_kw * 100) / 100;

            console.log(sliderHoursRangeResults);
            console.log(sliderDayRangeResults);
            console.log(sliderMonthRangeResults);
            console.log(sliderYearRangeResults);
        }
    }
}