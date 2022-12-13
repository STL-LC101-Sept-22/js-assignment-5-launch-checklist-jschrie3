// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // use getElementById to reference missionTarget div
    let div = document.getElementById("missionTarget");
    // Here is the HTML formatting for our mission target div.
    // use template literals to match provided HTML formatting
    div.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
    `;
};

// ADDING VALIDATION
//  validateInput() should take in a string as a parameter and return "Empty", "Not a Number", or "Is a Number" as appropriate.
function validateInput(testInput) {
    // create a variable to convert testInput to a number
    let inputNumber = Number(testInput);
    // if user does not input anything, return empty
    if (inputNumber === "") {
        return "Empty";
        // if user input is NaN then "not a number"  
    } else if (isNaN(inputNumber)) {
        return "Not a Number";
        // if user input is not NaN then "is a number"
    } else if (isNaN(inputNumber) === false) {
        return "Is a Number";
    }
};


// formSubmission() will take in a document parameter and strings representing the pilot, co-pilot, fuel level, and cargo mass.
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // intialize variables to reference DOM element objects
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuel = document.getElementById("fuelStatus");
    let cargo = document.getElementById("cargoStatus");


    // Add an alert to notify the user that all fields are required.
    // if any fields are empty, display "all fields required"
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(fuelLevel) === "Empty") {
        alert("All fields required!");
        // validate inputs - copilot and pilot should be strings and fuel and cargo mass should be numbers
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(fuelLevel) === "Not a Number") {
        alert("Pilot and Co-pilot must be strings. Fuel Level and Cargo Mass must be numbers.");
    } else {
        // Using template literals, update the li elements pilotStatus and copilotStatus to include the pilot's name and the co-pilot's name.
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch!`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch!`;

        // initialize launchStatus to reference DOM element in function below
        let launchStatus = document.getElementById("launchStatus");

        // If the user submits a fuel level that is too low (less than 10,000 liters),
        // change faultyItems to visible with an updated fuel status stating that there is not enough fuel for the journey.
        // If the user submits a cargo mass that is too large (more than 10,000 kilograms),
        // change the list to visible with an updated cargo status stating that there is too much mass for the shuttle to take off.

        if (fuelLevel < 10000 && cargoLevel > 10000) {
            // update shuttle requirements in faultyItems if shuttle does not meet launch specifications
            fuel.innerHTML = "There is not enough fuel for the journey.";
            cargo.innerHTML = "There is too much mass for the shuttle to take off.";
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            launchStatus.style.color = "red";
        } else if (fuelLevel < 10000 && cargoLevel <= 10000) {
            fuel.innerHTML = "There is not enough fuel for the journey.";
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            launchStatus.style.color = "red";
        } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            cargo.innerHTML = "There is too much mass for the shuttle to take off.";
            launchStatus.innerHTML = "Shuttle not ready for launch.";
            launchStatus.style.color = "red";
        } else {
            fuel.innerHTML = "Fuel level is sufficient for the journey.";
            cargo.innerHTML = "Mass is low enough for the shuttle to take off.";
            launchStatus.innerHTML = "Shuttle is ready for launch.";
            launchStatus.style.color = "green";
        }

    }

};

// FETCHING PLANETARY DATA
async function myFetch() {
    let planetsReturned;
    // pass url to fetch as a parameter, then use .then to handle the response data
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        // use the json method to access data in the response object 
        console.log(response);   
        return response.json();
    });
    return planetsReturned;
};

function pickPlanet(planets) {
    // Using Math.random(), return one planet from the list with a randomly-selected index.
    // math.random provides a number between 0 and 1, so multiply planets.length to ensure value is between 0 and the length of the array
    // then use math.floor to round math.random result to whole number to be used as a random index
    let index = Math.floor(Math.random() * planets.length);
    // return a random planet at index
    return planets[index];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
