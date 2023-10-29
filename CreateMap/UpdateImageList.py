# 緯度、経度、パノラマ画像のファイル名をcsvファイルに追記する
import csv
import pprint
import datetime
import requests
import CreatePanoramaImage

def UpdateImageList():
    # csvファイルの出力先を指定
    csv_path = "../../csv/map.csv"

    # 現在の時刻を取得
    t_delta = datetime.timedelta(hours=9)
    JST = datetime.timezone(t_delta, 'JST')
    now = datetime.datetime.now(JST)

    # 現在の時刻をファイル名としたパノラマ画像を作成
    fileName = CreatePanoramaImage.CreatePanoramaImage(now.strftime('%Y%m%d%H%M%S'))

    # 緯度、経度を取得（要検討）
    # 下記の実装はIPアドレスから制度の低い位置情報を取得している
    # 本来であればGPSからとってきたい
    geo_request_url = 'https://get.geojs.io/v1/ip/geo.json'
    data = requests.get(geo_request_url).json()

    # csvファイルに緯度、経度、パノラマ画像のファイル名を追記
    with open(csv_path, 'a') as f:
        writer = csv.writer(f)
        writer.writerow([data['latitude'], data['longitude'], fileName])