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

    var sliderHoursRange = document.getElementById("slider-hours-range");
    var sliderHoursRangeResults = document.getElementById("slider-hours-results");
    var sliderDayRangeResults = document.getElementById("slider-day-results");
    var sliderMonthRangeResults = document.getElementById("slider-month-results");
    var sliderYearRangeResults = document.getElementById("slider-year-results");

    // This resets the Numbers 
    sliderHoursRange.innerHTML = sliderHoursRange.value = 0;
    sliderHoursRangeResults.innerHTML = "Run Time: " + 0 + " Hours";
    sliderDayRangeResults.innerHTML = "$" + 0;
    sliderMonthRangeResults.innerHTML = "$" + 0;
    sliderYearRangeResults.innerHTML = "$" + 0;




    if (stateChoice === stateChoice) {
        document.getElementById("select-provider").style.display = "block";
        fetch('https://quietcoolsystems.com/sliderAPI/get-provider.php')
            .then((res) => res.json())
            .then((data) => {
                let output = '<option class="top-option">Please Select a Provider</option>';
                data.filter(function(provider) {
                    if (stateChoice === provider.states) {
                        output += `<option value="${provider.provider_name}">${provider.provider_name}</option>`;
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

    var sliderHoursRange = document.getElementById("slider-hours-range");
    var sliderHoursRangeResults = document.getElementById("slider-hours-results");
    var sliderDayRangeResults = document.getElementById("slider-day-results");
    var sliderMonthRangeResults = document.getElementById("slider-month-results");
    var sliderYearRangeResults = document.getElementById("slider-year-results");

    // This resets the Numbers 
    sliderHoursRange.innerHTML = sliderHoursRange.value = 0;
    sliderHoursRangeResults.innerHTML = "Run Time: " + 0 + " Hours";
    sliderDayRangeResults.innerHTML = "$" + 0;
    sliderMonthRangeResults.innerHTML = "$" + 0;
    sliderYearRangeResults.innerHTML = "$" + 0;

    // This resets the ac numbers for the AC Section
    var sliderHoursRangeAC = document.getElementById("ac-slider-hours-range");
    var sliderHoursRangeResultsAC = document.getElementById("ac-slider-hours-results");
    var sliderDayRangeResultsAC = document.getElementById("ac-slider-day-results");
    var sliderMonthRangeResultsAC = document.getElementById("ac-slider-month-results");
    var sliderYearRangeResultsAC = document.getElementById("ac-slider-year-results");

    sliderHoursRangeAC.innerHTML = sliderHoursRangeAC.value = 0;
    sliderHoursRangeResultsAC.innerHTML = "Run Time: " + 0 + " Hours";
    sliderDayRangeResultsAC.innerHTML = "$" + 0;
    sliderMonthRangeResultsAC.innerHTML = "$" + 0;
    sliderYearRangeResultsAC.innerHTML = "$" + 0;


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

    var sliderHoursRange = document.getElementById("slider-hours-range");
    var sliderHoursRangeResults = document.getElementById("slider-hours-results");
    var sliderDayRangeResults = document.getElementById("slider-day-results");
    var sliderMonthRangeResults = document.getElementById("slider-month-results");
    var sliderYearRangeResults = document.getElementById("slider-year-results");

    // This resets the Numbers 
    sliderHoursRange.innerHTML = sliderHoursRange.value = 0;
    sliderHoursRangeResults.innerHTML = "Run Time: " + 0 + " Hours";
    sliderDayRangeResults.innerHTML = "$" + 0;
    sliderMonthRangeResults.innerHTML = "$" + 0;
    sliderYearRangeResults.innerHTML = "$" + 0;

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

function showSlider() {
    document.getElementById("slider-and-results-wrapper").style.display = "flex";
    document.getElementById("ac-slider").style.display = "flex";

    var fanModel = document.getElementById("select-fan-models").value;
    console.log(fanModel);

    let FanArray = [];
    let ProviderArray = [];


    const grabData = async() => {
        const response = await fetch('https://quietcoolsystems.com/sliderAPI/allData.json');
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

        sliderHoursRange.innerHTML = sliderHoursRange.value = 0;
        sliderHoursRangeResults.innerHTML = "Run Time: " + 0 + " Hours";
        sliderDayRangeResults.innerHTML = "$" + 0;
        sliderMonthRangeResults.innerHTML = "$" + 0;
        sliderYearRangeResults.innerHTML = "$" + 0;


        sliderHoursRange.oninput = function() {
            sliderHoursRangeResults.innerHTML = "Run Time: " + this.value + " Hours";
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


// This is the AC Unit Slider Fetch


// This is to get the States
function getACUnitsData() {
    fetch('allData.json')
        .then((res) => res.json())
        .then((acData) => {

            let acOutput = '<option class="top-option">Please Select an AC Unit</option>';
            acData.ACunits.forEach(function(ac) {
                acOutput += `<option value="${ac.name}">${ac.name}</option>`;
            });
            document.getElementById("select-ac-unit").innerHTML = acOutput;
        })
}

getACUnitsData();

function getACUnits() {
    document.getElementById("ac-slider-and-results-wrapper").style.display = "flex";

    var acModel = document.getElementById("select-ac-unit").value;
    console.log(acModel);

    let ACArray = [];
    let ProviderArray2 = [];


    const grabAC = async() => {
        const response = await fetch('https://quietcoolsystems.com/sliderAPI/allData.json');
        const data = await response.json();
        ACArray = data.ACunits.map(itemAC => itemAC);
        ProviderArray2 = data.Providers.map(itemProv2 => itemProv2);
        var theACResult = document.getElementById("select-ac-unit").value;
        var theProviderResult = document.getElementById("select-provider").value;
        ACRes(theACResult, theProviderResult);
    }
    grabAC();

    const ACRes = (ac, provider2) => {
        let acResult = ACArray.filter(itemAC => itemAC.name === ac ? itemAC : null);
        let provResult2 = ProviderArray2.filter(itemProv2 => itemProv2.provider_name === provider2 ? itemProv2 : null);

        // console.log(acResult[0].watts);

        var sliderHoursRangeAC = document.getElementById("ac-slider-hours-range");
        var sliderHoursRangeResultsAC = document.getElementById("ac-slider-hours-results");
        var sliderDayRangeResultsAC = document.getElementById("ac-slider-day-results");
        var sliderMonthRangeResultsAC = document.getElementById("ac-slider-month-results");
        var sliderYearRangeResultsAC = document.getElementById("ac-slider-year-results");

        sliderHoursRangeAC.innerHTML = sliderHoursRangeAC.value = 0;
        sliderHoursRangeResultsAC.innerHTML = "Run Time: " + 0 + " Hours";
        sliderDayRangeResultsAC.innerHTML = "$" + 0;
        sliderMonthRangeResultsAC.innerHTML = "$" + 0;
        sliderYearRangeResultsAC.innerHTML = "$" + 0;


        sliderHoursRangeAC.oninput = function() {
            sliderHoursRangeResultsAC.innerHTML = "Run Time: " + this.value + " Hours";
            sliderDayRangeResultsAC.innerHTML = "$" + Math.round(acResult[0].watts / 1000 * this.value * provResult2[0].price_kw * 100) / 100;
            sliderMonthRangeResultsAC.innerHTML = "$" + Math.round(acResult[0].watts / 1000 * 30 * this.value * provResult2[0].price_kw * 100) / 100;
            sliderYearRangeResultsAC.innerHTML = "$" + Math.round(acResult[0].watts / 1000 * 365 * this.value * provResult2[0].price_kw * 100) / 100;

            console.log(sliderHoursRangeResultsAC);
            console.log(sliderDayRangeResultsAC);
            console.log(sliderMonthRangeResultsAC);
            console.log(sliderYearRangeResultsAC);
        }
    }
}

getACUnits();