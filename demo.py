import cv2 as cv
import numpy as np
import sys
img = cv.imread("/Users/shimadakeigo/Dropbox/My Mac (keigo-shimada.local)/Downloads/AR/openCV/img/blue.png")

# # 画像表示
# if img is None:
#     sys.exit("Could not read the image.")
# cv.imshow("Display window", img)
# k = cv.waitKey(0)
# if k == ord("s"):
#     cv.imwrite("export.png", img)


# # 色の強調
# # BGRからHSVへの変換
# hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)

# # 色の範囲を定義（赤色の例）
# lower_red = np.array([0, 100, 100])  # 下限値
# upper_red = np.array([10, 255, 255])  # 上限値

# # 色の範囲内のピクセルをマスク
# mask = cv.inRange(hsv, lower_red, upper_red)

# # オリジナルの画像にマスクを適用して特定の色を強調表示
# result = cv.bitwise_and(img, img, mask=mask)

# # 結果を表示
# cv.imshow('Color Detection', result)
# cv.waitKey(0)
# cv.destroyAllWindows()


# 顕著な色を出力
# BGRからHSVへの変換
hsv = cv.cvtColor(img, cv.COLOR_BGR2HSV)

# ヒストグラムを計算
hist_hue = cv.calcHist([hsv], [0], None, [256], [0, 256])

# 最頻値を求める
most_frequent_hue = np.argmax(hist_hue)

# 最頻値に対応する色を表示
print("Most Frequent Hue:", most_frequent_hue)

# 最頻値に対応する色をBGRに変換
color_bgr = np.uint8([[[most_frequent_hue, 255, 255]]])
color_rgb = cv.cvtColor(color_bgr, cv.COLOR_HSV2BGR)

# 結果を表示
print("RGB Color:", color_rgb[0, 0])