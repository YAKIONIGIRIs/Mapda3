import boto3
import cv2
import base64
from PIL import Image

BUCKET_NAME = 'mapda3'
IMAGE_LIST = ['test1-1.JPEG', 'test1-2.JPEG', 'test1-3.JPEG', 'test1-4.JPEG']

s3 = boto3.client('s3')

def handler(event, context):
    tmp_list = []
    key = 'user1/' + event['timestamp'] + '/'
    tmp_out_path = '/tmp/output.JPEG'
    upload_path = key + 'output.JPEG'

    for i in IMAGE_LIST:
        download_path = '/tmp/' + i
        s3.download_file(BUCKET_NAME, key + i, download_path)
        image = cv2.imread(download_path)
        tmp_list.append(image)

    stitcher = cv2.Stitcher.create()
    stitched = stitcher.stitch(tmp_list)

    cv2.imwrite(tmp_out_path, stitched[1])
    s3.upload_file(tmp_out_path, BUCKET_NAME, upload_path)

    url = s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': BUCKET_NAME,
            'Key': upload_path
        },
        ExpiresIn=3600
    )

    return {
            'statusCode': 200,
            'body': url,
    }