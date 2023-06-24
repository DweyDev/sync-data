const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const recordID = event.RecordID; 
    const s3Params = {
        Bucket: 'craft-data-bucket', 
        Key: recordID
    };

    const dynamoDBParams = {
        TableName: 'craft-data-table', 
        Key: {
            'RecordID': recordID
        }
    };

    try {
        await s3.deleteObject(s3Params).promise();
        await dynamoDB.delete(dynamoDBParams).promise();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
