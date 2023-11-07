import cv2 as cv
import numpy as np

# 画像を読み込む
image = cv.imread('/Users/shimadakeigo/Dropbox/My Mac (keigo-shimada.local)/Downloads/AR/openCV/img/blue.png')  # 画像ファイルのパスを指定

# 画像をBGRからRGBに変換
image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)

# 画像を1次元の配列に変換
pixels = image_rgb.reshape(-1, 3)

# ピクセルの色の数を数える
pixel_counts = np.bincount(pixels.ravel(), minlength=256)

# 最も多い色のインデックスを取得
most_common_color_index = np.argmax(pixel_counts)

# インデックスからRGB色を取得
most_common_color_rgb = np.unravel_index(most_common_color_index, (256, 256, 256))

# 結果を表示
print("最も多い色 (RGB):", most_common_color_rgb)
