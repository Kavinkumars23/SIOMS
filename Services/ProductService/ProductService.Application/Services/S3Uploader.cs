using Amazon.S3.Transfer;
using Amazon.S3;
using Microsoft.AspNetCore.Http;
using ProductService.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ProductService.Application.Services
{
    public class S3Uploader : IS3Uploader
    {
        
            private readonly IAmazonS3 _s3Client;
            private readonly string _bucketName;

            public S3Uploader(IConfiguration config)
            {
                var awsSection = config.GetSection("AWS");

                var credentials = new Amazon.Runtime.BasicAWSCredentials(
                    awsSection["AccessKey"],
                    awsSection["SecretKey"]
                );

                _bucketName = awsSection["BucketName"];
                var region = Amazon.RegionEndpoint.GetBySystemName(awsSection["Region"]);

                _s3Client = new AmazonS3Client(credentials, region);
            }

            public async Task<string> UploadFileAsync(IFormFile file)
            {
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";

                using var stream = file.OpenReadStream();
                var request = new TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = fileName,
                    BucketName = _bucketName,
                    ContentType = file.ContentType,
                };

                var transferUtility = new TransferUtility(_s3Client);
                await transferUtility.UploadAsync(request);

                return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
            }
        }
    }
