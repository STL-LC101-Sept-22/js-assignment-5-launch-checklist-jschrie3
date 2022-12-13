// Write your JavaScript code here!


window.addEventListener("load", function () {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        // store randomly selected planet in variable by calling pickPlanet function
        let randomPlanet = pickPlanet(listedPlanets);
        // call addDestinationInfo function and pass random planet information to function
        addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
    });

    // use getElementById to reference faultyItems
    let list = document.getElementById("faultyItems");
    // keep list hidden unless otherwise indicated by validInput function
    list.style.visibility = "hidden";

    // use querySelector to locate form div
    let form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        // use preventDefault to prevent a request from being sent out and the page reloading
        event.preventDefault();

        // use querySelector to get reference to form inputs and pass them to the formSubmission function
        let pilotInput = document.querySelector("input[name = pilotName]");
        let pilot = pilotInput.value;

        let copilotInput = document.querySelector("input[name = copilotName]");
        let copilot = copilotInput.value;

        let fuelInput = document.querySelector("input[name = fuelLevel]");
        let fuelLevel = fuelInput.value;

        let cargoInput = document.querySelector("input[name = cargoMass]");
        let cargoLevel = cargoInput.value;

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);

    });
});

