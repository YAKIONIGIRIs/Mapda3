def CreateImage():
    # 画像を読み込む。
    img1 = cv2.imread('ScreenShot/left.png')
    img2 = cv2.imread('ScreenShot/right.png')
    # ２枚の画像の高さと幅をresizeして同じにする　数字は任意で。本当は大きい方に自動的に合わせたかったけど今回割愛 
    img1_resize = cv2.resize(img1, (800, 700))
    img2_resize = cv2.resize(img2, (800, 700))

    # パノラマ合成する。
    stitcher_create = cv2.Stitcher.create()
    status1,stitched_panorama = stitcher_create.stitch([img1_resize, img2_resize])
    print(status1)
    # パノラマ画像を保存する。
    cv2.imwrite('panorama_output.png', stitched_panorama)

    # スキャンを合成する
    stitcher_scan = cv2.Stitcher.create(cv2.Stitcher_SCANS)
    status2,stitched_scan = stitcher_scan.stitch([img1_resize, img2_resize])
    print(status2)
    # Scan画像を保存する
    cv2.imwrite('scan_output.png', stitched_scan)

   
    print("finish")

CreateImage()
