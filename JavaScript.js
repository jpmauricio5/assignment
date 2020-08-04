
function blurEverythingExceptInfo(){     // this function blurs the entire screen (except for the info and unmute) and makes the infoText visible
    if ( document.getElementById("nonInfo").style.filter == "blur(6px)")  // if the screen is already blurred with the infoText visible, then deblur it and hide the infoText
    {
        document.getElementById("nonInfo").style.filter = "blur(0px)";
        document.getElementById("infoText").style.visibility = "hidden";
    }
    else {
        document.getElementById("nonInfo").style.filter = "blur(6px)";
        document.getElementById("infoText").style.visibility = "visible";
    }
    
}


// this section loads all of the mp3 files needed for the page  //  //
var snareFORTE = new Tone.Player ("audio/snareFORTE.mp3").toMaster();
var snarePIANO = new Tone.Player ("audio/snarePIANO.mp3").toMaster();
var singleStrokeExample = new Tone.Player ("audio/singleStrokeExample.mp3").toMaster();
var doubleStrokeExample = new Tone.Player ("audio/doubleStrokeExample.mp3").toMaster();
var tripletSingleDoubleExample = new Tone.Player ("audio/tripletSingleDoubleExample.mp3").toMaster();
var paradiddleExample = new Tone.Player ("audio/paradiddleExample.mp3").toMaster();
var paradiddleDiddleExample = new Tone.Player ("audio/paradiddleDiddleExample.mp3").toMaster();
var doubleParadiddleExample = new Tone.Player ("audio/doubleParadiddleExample.mp3").toMaster();
var metronome = new Tone.Player ("audio/metronome.mp3").toMaster();
metronome.volume.value = 1;
//    //   //




// // // START BUTTON AREA //  //  //
var startButton = new Nexus.TextButton("startButton", {
    'size': [250,50],
    'state': false,
    'text': 'Click to start',
    'alternateText': 'Click to stop'
})

startButton.on('change', () => Nexus.context.resume());
startButton.on('change', toggleTransport); // this button toggles the Tone.Transport, which controls the playback of the snare samples and the rudiment animations

function toggleTransport(boolean){
    if (boolean == true)
    {
        Tone.Transport.start();
    }
    else if (boolean == false)
    {
        Tone.Transport.stop();
        rudimentProgression = 1;  // resets the drum rudiment animation back to step 1
        DrumstickR.style.transform="rotate(50deg)"; // gets the drumsticks back to the original position
        DrumstickL.style.transform="rotate(-30deg)";// gets the drumsticks back to the original position
    }
}
// //  //  //  //




var rudimentMenu = new Nexus.Select('rudimentMenu',{
    'size': [200,33],
    'options': ["Single Stroke", "Double Stroke", "Paradiddle","Triplet Single Double", "Paradiddle Diddle", "Double Paradiddle"]
})



// // // EXAMPLE BUTTON AREA // // //
var exampleButton = new Nexus.TextButton("exampleButton", {
    'size': [120,50],
    'state': false,
    'text': 'Example',
    'alternateText': 'Example'
})

var turnOffButtonAfterExamplePlayback;
exampleButton.on('change', function(buttonState){
    if (buttonState == true)
    {
        startButton.state = false; // when the example audio starts, stop the rudiment playback and animations by turning off its button
        currentAudioExample.start();
        turnOffButtonAfterExamplePlayback = setTimeout(function(){exampleButton.state = false;}, 7000); // turns the example button back off after the audio example is finished (around 7000ms for all files)
    }
    else if (buttonState == false)
    {
        currentAudioExample.stop();
        clearTimeout(turnOffButtonAfterExamplePlayback); // stops the setTimeout timer triggered above when the audio started, in case the user stops the example before it finishes
    }
})
// // // // //




// // // BPM SLIDER AREA // // //
var BPMslider = new Nexus.Slider("BPMslider",{
    'size': [150,20],
    'mode': 'absolute',
    'min': 10,
    'max': 50,
    'step': 5,
    'value': 30
})

Tone.Transport.bpm.value = BPMslider.value;
BPMslider.on('change', function(sliderValue) {   // sets the BPM for the Tone.Transport according to the BPM slider and displays it in the page
    Tone.Transport.bpm.value = sliderValue;
    document.getElementById("BPM").innerHTML = sliderValue + " BPM";
})
// // // // //





// // // TONE.TRANSPORT LOOPS SETUP FOR RUDIMENT PLAYBACK // // // // //
var rudimentProgression = 1;  // used to rotate through the selected rudiment's steps


var simpleTimeSignatureLoop = new Tone.Loop(function(time){  // used for rudiments played in simple time signatures. The code inside runs every 16th note (it follows the BPM set with the slider through Tone.Transport)
    currentRudiment(); // triggers the rudimentAnimation + drumSamples depending on which step of the rudiment it's currently in
    rudimentProgression++; // moves the rudimentProgression to the next step
}, "16n").start(0);


var compoundTimeSignatureLoop = new Tone.Loop(function(time){ // essentially the same loop as above but the code inside runs every 16th note triplet - which means it's used for rudiments that are played in compound time signatures
    currentRudiment();
    rudimentProgression++;
}, "16t").start(0);
compoundTimeSignatureLoop.mute = true; // mutes it because singleStroke is the default rudiment on start, which is played in a simple time signature


var metronomeLoop = new Tone.Loop(function(time){ // ran every quarter note to play the metronome sound, trigger the metronomeIcon animation and vibrate the phone
    metronome.start();
    changeMetronomeIcon();
    navigator.vibrate(100); // vibrates the phone for 100ms
}, "4n").start(0);
// // // // //



function changeMetronomeIcon(){ // "swings" the metronomeIcon pendulum to create visual feedback for the BPM, by altering the img that is being displayed
    switch(document.getElementById("metronomeIconImage").src)
    {
        case "http://localhost:8000/v1/images/metronomeL.png":
            document.getElementById("metronomeIconImage").src = "images/metronomeR.png";
            break;
            
        case "http://localhost:8000/v1/images/metronomeR.png":
            document.getElementById("metronomeIconImage").src = "images/metronomeL.png";
            break;
            
        default:
    }
}



// // // RUDIMENT MENU AREA // // //
var currentAudioExample = singleStrokeExample; // because singleStroke is the default rudiment on start
var currentRudimentNotation = document.getElementById("rudimentNotation");
var currentRudiment; // later defined as singleStroke on start

rudimentMenu.on('change',function(v){
    startButton.state = false; // stop the current rudiment playback and animation when a different rudiment is selected
    exampleButton.state = false;// stop the current rudiment example playback
    if (rudimentMenu.value == "Single Stroke" || rudimentMenu.value == "Double Stroke" || rudimentMenu.value == "Paradiddle") // if the chosen rudiment is supposed to be played in a simple time signature, then...
    {
        simpleTimeSignatureLoop.mute = false;
        compoundTimeSignatureLoop.mute = true;
    }
    else if (rudimentMenu.value == "Triplet Single Double" || rudimentMenu.value == "Paradiddle Diddle" || rudimentMenu.value == "Double Paradiddle") // if the chosen rudiment is supposed to be played in a compound time signature, then...
    {
        simpleTimeSignatureLoop.mute = true;
        compoundTimeSignatureLoop.mute = false;
    }
    
    switch (rudimentMenu.value) // sets the currentRudiment, currentAudioExample and currentRudimentNotation depending on which rudiment is selected from the menu
    {
        case "Single Stroke":
            currentRudiment = singleStroke;
            currentAudioExample = singleStrokeExample;
            currentRudimentNotation.innerHTML = " <b> <u>R</u> </b> l r l";
            break;
            
        case "Double Stroke":
            currentRudiment = doubleStroke;
            currentAudioExample = doubleStrokeExample;
            currentRudimentNotation.innerHTML = "<b> <u>R</u> </b> r l l ";
            break;
            
        case "Paradiddle":
            currentRudiment = paradiddle;
            currentAudioExample = paradiddleExample;
            currentRudimentNotation.innerHTML = "<b> <u>R</u> </b> l r r <br> <b> <u>L</u> </b> r l l";
            break;
            
        case "Triplet Single Double":
            currentRudiment = tripletSingleDouble;
            currentAudioExample = tripletSingleDoubleExample;
            currentRudimentNotation.innerHTML = "<b> <u>R</u> </b> l l <b> <u>R</u> </b> l l";
            break;
            
        case "Paradiddle Diddle":
            currentRudiment = paradiddlediddle;
            currentAudioExample = paradiddleDiddleExample;
            currentRudimentNotation.innerHTML = "<b> <u>R</u> <u>L</u> </b> r r l l";
            break;
            
        case "Double Paradiddle":
            currentRudiment = doubleParadiddle;
            currentAudioExample = doubleParadiddleExample;
            currentRudimentNotation.innerHTML = "<b> <u>R</u> </b> l <b> <u>R</u> </b> l r r <br> <b> <u>L</u> </b> r <b> <u>L</u> </b> r l l ";
            break;
            
        default:
    }
})
// // // // //





// // // DRUMSTICKS ANIMATIONS // // //
function rotateDrumstickHit(LeftOrRight){ // rotates the drumsticks to simulate a drum hit
    if (LeftOrRight == "L")
    {
        DrumstickL.style.transform="rotate(-10deg)";
    }
    else if (LeftOrRight == "R")
    {
        DrumstickR.style.transform="rotate(10deg)";
    }
}


function rotateDrumstickBack(isItAccent, LeftOrRightDrumstick){ // rotates the drumsticks imgs to emulate rebound after hitting the drumhead. If the next hit with that drumstick is going to be an accent, then it rotates it back even further
    if (isItAccent == "accent")
    {
        if (LeftOrRightDrumstick == "left")
        {
            DrumstickL.style.transform="rotate(-50deg)";
        }
        else if (LeftOrRightDrumstick == "right")
        {
            DrumstickR.style.transform="rotate(50deg)";
        }
    }
    else if (isItAccent == "nonAccent")
    {
        if (LeftOrRightDrumstick == "left")
        {
            DrumstickL.style.transform="rotate(-30deg)";
        }
        else if (LeftOrRightDrumstick == "right")
        {
            DrumstickR.style.transform="rotate(30deg)";
        }
    }
}
// // // // //
