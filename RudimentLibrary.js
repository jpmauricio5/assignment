// // // RUDIMENT LIBRARY AREA // // //

/* Each of the following functions will define each step for different rudiments, depending on which drumstick needs to be played, as well which drum sample (non accent - snarePIANO; accent - snareFORTE */

var singleStroke = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R"); // simulates the drum hit
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right"); // simulates the rebound from the above hit after 100ms
            snareFORTE.start(); // triggers the respective drum sample
            break;
            
        case 2:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 3:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 4:
            rotateDrumstickHit("L");
            snarePIANO.start();
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right"); // prepares the accent for the next hit
            rudimentProgression = 0; // resets the rudimentProgression to keep the animation loop going on
            break;
            
        default:
    }
};
currentRudiment = singleStroke; // because SingleStroke is the default rudiment on start

var doubleStroke = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            break;
            
        case 2:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 3:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 4:
            rotateDrumstickHit("L");
            snarePIANO.start();
            rudimentProgression = 0;
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            break;
            
        default:
    }
};

var paradiddle = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            
            break;
        case 2:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 3:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 4:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            setTimeout(rotateDrumstickBack, 100, "accent", "left");
            snarePIANO.start();
            break;
            
        case 5:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snareFORTE.start();
            break;
            
        case 6:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 7:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 8:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            rudimentProgression = 0;
            break;
            
        default:
            
    }
};

var tripletSingleDouble = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            break;
            
        case 2:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 3:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            break;
            
        case 4:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            break;
            
        case 5:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 6:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            rudimentProgression = 0;
            break;
            
        default:
            
    }
};

var paradiddlediddle = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            setTimeout(rotateDrumstickBack, 100, "accent", "left");
            snareFORTE.start();
            break;
            
        case 2:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snareFORTE.start();
            break;
            
        case 3:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 4:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 5:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 6:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            rudimentProgression = 0;
            break;
            
        default:
            
    }
};

var doubleParadiddle = function(){
    switch(rudimentProgression)
    {
        case 1:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            break;
            
        case 2:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            break;
            
        case 3:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snareFORTE.start();
            break;
            
        case 4:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 5:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 6:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            setTimeout(rotateDrumstickBack, 100, "accent", "left");
            snarePIANO.start();
            break;
            
        case 7:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snareFORTE.start();
            break;
            
        case 8:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            setTimeout(rotateDrumstickBack, 100, "accent", "left");
            snarePIANO.start();
            break;
            
        case 9:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snareFORTE.start();
            break;
            
        case 10:
            rotateDrumstickHit("R");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "right");
            snarePIANO.start();
            break;
            
        case 11:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            snarePIANO.start();
            break;
            
        case 12:
            rotateDrumstickHit("L");
            setTimeout(rotateDrumstickBack, 100, "nonAccent", "left");
            setTimeout(rotateDrumstickBack, 100, "accent", "right");
            snarePIANO.start();
            rudimentProgression = 0;
            break;
            
        default:
            
    }
};
// // // // // //
