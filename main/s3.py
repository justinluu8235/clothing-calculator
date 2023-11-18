import boto3
from django.conf import settings
import os
class S3Client:
    def __init__(self):

        self.s3_client= boto3.client('s3',
                                     aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                                     aws_secret_access_key=os.environ.get('AWS_SECRET_KEY'),
                                     region_name='us-west-2'
                                     )
        self.s3_resource = boto3.resource('s3',
                                          aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
                                          aws_secret_access_key=os.environ.get('AWS_SECRET_KEY'),
                                          region_name='us-west-2'
                                          )
        self.bucket_name = 'app-data-justin-l'


    def list_objects(self, path):
        # example: client.list_object(f"static/style_category_pics/2")
        params = {
            'Bucket': self.bucket_name,
            'Prefix': path,
        }
        res = self.s3_client.list_objects_v2(**params)
        return res['Contents']

    def delete_objects(self, path):
        bucket = self.s3_resource.Bucket(self.bucket_name)
        objs = bucket.objects.filter(Prefix=path)
        deleted_objs = objs.delete()
        attempt = 0
        while len(deleted_objs) > 0 and attempt < 5:
            # delete() doesnt always work on first attempt.
            # keep trying until it works
            objs = bucket.objects.filter(Prefix=path)
            deleted_objs = objs.delete()
            attempt += 1


