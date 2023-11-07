const canvas = document.getElementById('camera-preview');
const captureButton = document.getElementById('capture-button');
const capturedImage = document.getElementById('captured-image');
let stream = null;

async function setupCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
        };
        videoElement.play();

        const context = canvas.getContext('2d');
        captureButton.addEventListener('click', () => {
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            capturedImage.src = canvas.toDataURL('image/png');
            capturedImage.style.display = 'block';
        });
    } catch (error) {
        console.error('カメラアクセスエラー:', error);
    }
}

// `DOMContentLoaded` イベントを使用してDOMが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    setupCamera();
});

// カメラのストリームを停止
window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});
