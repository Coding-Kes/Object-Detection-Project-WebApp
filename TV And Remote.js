
img = "";
status = "";
objects = [];

function preload()
{
     img = loadImage("TV And Remote.jpg");
}

function setup()
{
    canvas = createCanvas(670, 510);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(img, 0, 0, 670, 510);
    
    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detected Objects";
            
            fill("#FFD700");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent +"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("FFD700");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            strokeWeight(2);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error();
    }
    else
    {
        console.log(results);
        objects = results;
    }
}



