# import boto3
import requests

# デモでは画像のアップロードを省略
# # パノラマ画像の元となる画像をS3にアップロード
# client = boto3.client(
#     's3',
#     # アクセスキーとシークレットアクセスキーを入力
#     aws_access_key_id='**********',
#     aws_secret_access_key='**********',
#     region_name='ap-northeast-1'
# )
# # 四方の画像をアップロード
# for i in range(1, 4):
#     # デモ用の画像ファイル名はtest1-n.JPEG(nは1から4の自然数)
#     Filename = './test1-' + i + ".JPEG"
#     # デモ用のバケット名はmapda3
#     Bucket = 'mapda3'
#     # デモ用のパスを指定
#     Key = 'user1/demo/test1-' + i + ".JPEG"
#     # アップロード
#     client.upload_file(Filename, Bucket, Key)

# パノラマ画像を返すLambda関数のエンドポイント
url = "https://r5gg3wiyb6.execute-api.ap-northeast-1.amazonaws.com/default/CreateImage"
# タイムスタンプを指定（デモ用の値はdemo）
demodata = 'timestamp=demo'
# GETで接続
r = requests.get(
        url,
        params = demodata
    )

# S3に保存されたパノラマ画像の署名付きurlを出力
# レスポンスボディの30文字目から、文末から3文字目までが所望のurlなので、その部分だけを指定
print(r.text[29:-2])