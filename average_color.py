import cv2 as cv
import numpy as np

# 画像を読み込む
image = cv.imread('/Users/shimadakeigo/Dropbox/My Mac (keigo-shimada.local)/Downloads/AR/openCV/img/test3.png')  # 画像ファイルのパスを指定

# 画像をリサイズする（オプション）
# image = cv.resize(image, (desired_width, desired_height))

# 画像をBGRからHSVに変換
hsv = cv.cvtColor(image, cv.COLOR_BGR2HSV)

# 画像の幅と高さを取得
height, width = image.shape[:2]

# 画像の各ピクセルの色情報を取得
colors = []

for y in range(height):
    for x in range(width):
        pixel_color = image[y, x]
        colors.append(pixel_color)

# 色情報のリストをNumPy配列に変換
colors = np.array(colors)

# 色情報のリストから全体の色を計算
average_color = np.mean(colors, axis=0)

# BGRからRGBに変換
average_color = average_color[::-1]

# 結果を表示
print("全体の色 (RGB):", average_color)
