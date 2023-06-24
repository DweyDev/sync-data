const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const recordID = event.RecordID; 

    const s3Params = {
        Bucket: 'craft-data-bucket', 
        Key: recordID, 
        Expires: 60, 
    };

    try {
        const preSignedUrl = s3.getSignedUrl('getObject', s3Params);
        return preSignedUrl;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
