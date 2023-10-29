# パノラマ画像を作成する
import argparse
import cv2
import os
import glob

def CreatePanoramaImage():
    # 撮影した入力となる画像を下記のディレクトリに保存
    input_dir_path = "../../image/"
    # 作成したパノラマ画像を下記のファイルに保存
    output_dir_path = "../../image-out/output.jpg"

    # 入力画像を読み取ってリストに格納
    input_images = glob.glob(os.path.join(input_dir_path, "*"))

    # 入力画像を結合し、パノラマ画像を作成
    tmp_list = []
    for i in input_images:
        image = cv2.imread(i)
        if image is None:
            print(f'Error: Unable to open file "{i}".')
            exit()
        tmp_list.append(image)
    if len(tmp_list) == 1:
        cv2.imwrite(args.output, input_images[0])
    else:
        stitcher = cv2.Stitcher.create()
        stitched = stitcher.stitch(tmp_list)
        cv2.imwrite(output_dir_path, stitched[1])

    # パノラマ画像作成に用いた入力画像を削除
    for i in input_images:
        os.remove(i)

CreatePanoramaImage()
