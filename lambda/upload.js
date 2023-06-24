const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const recordID = event.RecordID;

    const s3Params = {
        Bucket: 'craft-data-bucket', 
        Key: recordID || 'test', 
        Expires: 60,
    };

    try {
        const preSignedUrl = s3.getSignedUrl('putObject', s3Params);

        const dynamoDBParams = {
            TableName: 'craft-data-table',
            Item: {
                'RecordID': recordID,
                'LastModified': Date.now(),
                'Version': 1,
                'S3ObjectKey': recordID,
            },
        };

        await dynamoDB.put(dynamoDBParams).promise();

        return preSignedUrl;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
