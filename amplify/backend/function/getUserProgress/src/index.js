const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const USER_ACTIVITY_TABLE = process.env.API_360VIDEOPLATFORM_USERACTIVITYTABLE_NAME;

exports.handler = async (event) => {
  const userId = event.arguments.userId;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request: userId is required.' }),
    };
  }

  try {
    const params = {
      TableName: USER_ACTIVITY_TABLE,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await docClient.query(params).promise();
    return result.Items;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch user progress.', error: error.message }),
    };
  }
};
