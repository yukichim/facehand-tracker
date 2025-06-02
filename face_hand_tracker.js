//console.log(handTrack)

const video = document.getElementById("myvideo");
const canvas = document.getElementById("mycanvas");

let model;

const options={
    flipsHorizonal:false,//水平方向の反転を行わない
    maxNumBoxes:3, //検出ボックスの最大数
    scoreThreshold: 0.7,//予測信頼度
}

let context = canvas.getContext("2d");

//handTrackオブジェクトでオプションがロードれたときthen()=その時（ロードされたとき（）内を実行する）：非同期処理
handTrack.load(options).then(function(modelData){
    model = modelData;
    console.log(model);

    //webカメラを起動する
    handTrack.startVideo(video).then(function(status){
        if(status){
            console.log(status);
            startDetection();
        }else{
            console.log('false');
        }
    })
})

function startDetection(){
    //render=表示する
    model.detect(video).then((predictions)=>{
        model.renderPredictions(predictions,canvas,context,video);
        requestAnimationFrame(startDetection);
    });
}