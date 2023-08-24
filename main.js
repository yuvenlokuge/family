

camera=document.getElementById("camera")
Webcam.set({
    width:400,
    height:400,
    image_format:'png',
    png_quality:99
});

Webcam.attach("#camera")

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    })
}

console.log("ml5 version is" +ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QEcVOQ3JL/model.json",modelLoaded);

function modelLoaded()
{
    console.log("model stared loading");
}

function check()
{
    img=document.getElementById("selfie_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,result)
{
  if(error){console.error(error)}
  else{
    console.log(result)
    document.getElementById("result_label").innerHTML="It is "+result[0].label;
    var synth = window.speechSynthesis;
    speak_data="It is "+result[0].label;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis)
   }

}