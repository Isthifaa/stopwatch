document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.querySelector("#startbtn");
    const stopBtn = document.querySelector("#stopbtn");
    const resetBtn = document.querySelector("#resetbtn");
    const timeDisplay = document.querySelector(".timeDisplay");

    let intervalId;
    //variables to hold the start time and elapsed time
    let startTime = 0;
    let elapsedTime = 0;

    //start button is disabled when the page loads
    //add event listeners to the buttons when the page loads and the buttons are clicked
    startBtn.addEventListener("click", () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
        //set the start time to the current time minus the elapsed time
        startTime = Date.now() - elapsedTime;
        //call the updateTime function every 10 milliseconds
        intervalId = setInterval(updateTime, 10);
    });

    stopBtn.addEventListener("click", () => {
        clearInterval(intervalId);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(intervalId);
        elapsedTime = 0;
        timeDisplay.textContent = "00:00:00";
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
    });
    //function to update the time
    function updateTime() {
        //get the current time
        const currentTime = Date.now();
        //calculate the elapsed time
        elapsedTime = currentTime - startTime;
        //convert the elapsed time to a string and display it
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);
        //const milliseconds = Math.floor(elapsedTime % 1000); 
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);

        const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
        timeDisplay.textContent = timeString;
    }
//function to pad is used to add a 0 to the front of the number if it is less than 10
    function pad(value) {
        return value.toString().padStart(2, "0");
    }
});
