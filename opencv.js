// OpenCV.jsのスクリプトを非同期で読み込む設定
const script = document.createElement('script');
script.setAttribute('async', '');
script.setAttribute('onload', 'onOpenCvReady();');
script.setAttribute('src', 'https://docs.opencv.org/master/opencv.js');
document.head.appendChild(script);

// OpenCV.jsが読み込まれたときに呼び出されるコールバック関数
function onOpenCvReady() {
    // OpenCV.jsが読み込まれた後にコードを実行

    // OpenCV.jsのオブジェクトを取得
    const cv = window.cv;

    // カメラフィード用のビデオ要素
    const video = document.getElementById("cameraFeed");

    // 画像キャプチャ用のキャンバス要素とコンテキスト
    const captureCanvas = document.getElementById("captureCanvas");
    const captureCtx = captureCanvas.getContext("2d");

    // 写真を撮るボタン
    const captureButton = document.getElementById("captureButton");

    // 画像処理結果を表示するためのキャンバス要素とコンテキスト
    const canvas = document.getElementById("canvasOutput");
    const ctx = canvas.getContext("2d");

    // カメラへのアクセス設定
    if (navigator.mediaDevices.getUserMedia) {
        // バックカメラを使用するための設定
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function () {
                    video.play();
                };
            })
            .catch(function (error) {
                console.log("バックカメラへのアクセスエラー: " + error);
            });
    }

    // 写真を撮るボタンのクリックイベントリスナー
    captureButton.addEventListener("click", function () {
        // カメラフィードをキャンバスにコピー
        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;
        captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);

        // キャンバスから画像を読み込み
        const image = cv.imread(captureCanvas);

        // 画像をRGB色空間に変換
        const rgbImage = new cv.Mat();
        cv.cvtColor(image, rgbImage, cv.COLOR_RGBA2RGB);

        // 画像の幅と高さを取得
        const width = rgbImage.cols;
        const height = rgbImage.rows;

        // ピクセルごとに色をカウント
        const colorCount = {};
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixel = rgbImage.ucharPtr(y, x);
                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                if (colorCount[color]) {
                    colorCount[color]++;
                } else {
                    colorCount[color] = 1;
                }
            }
        }

        // 最も頻出する色とその出現回数を取得
        let mostFrequentColor = null;
        let maxCount = 0;
        for (const color in colorCount) {
            if (colorCount[color] > maxCount) {
                mostFrequentColor = color;
                maxCount = colorCount[color];
            }
        }
        console.log("最も頻出する色:", mostFrequentColor, "出現回数:", maxCount);

        // 処理結果をキャンバスに表示
        cv.imshow(canvas, image);

        // 処理結果をHTMLに表示
        const resultDisplay = document.getElementById("resultDisplay");
        resultDisplay.innerHTML = `最も頻出する色: ${mostFrequentColor}, 出現回数: ${maxCount}`;

        // メモリの解放
        image.delete();
        rgbImage.delete();
    });
}