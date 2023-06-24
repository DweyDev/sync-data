# sync-data

1. Service Architecture:
The service built throughout this chat can be divided into several key components:
 - AWS Lambda
 - Amazon DynamoDB
 - Amazon S3
 - Amazon API Gateway
 - AWS AppSync

2. Known Limitations: 
 - Scalability: Depending on the size of the data batches, the Lambda functions might face performance issues. Also, read and write capacity of DynamoDB need to be managed properly to handle high loads.
 - Concurrency: DynamoDB handles concurrent writes well, but if two clients upate the same record at nearly the same time, one write could overwrite the other.
 - Error Handling: If a function throws an error mid-execution then a part of the file might be updated, the remaining part not.
 - There might be a delay of few seconds until one clients receives updates from another one.

3. Next Steps to Production Grade Solution:
 - Authentication and Authorization
 - Testing
 - Optimization for Costs and Performance
 - Data Backup and Recovery
 - Version Control
 - Implement CI/CD
