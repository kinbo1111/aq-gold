const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const USER_ACTIVITY_TABLE = 'UserActivity-qfsza2jypjbuhjapd6dwg6v3dy-develop';

exports.handler = async (event) => {
  const { userId, videoId, progress } = JSON.parse(event.body);

  if (!userId || !videoId || progress === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request: userId, videoId, and progress are required.' }),
    };
  }

  try {
    const params = {
      TableName: USER_ACTIVITY_TABLE,
      Key: { userId, videoId },
      UpdateExpression: 'SET progress = :progress, lastWatchedAt = :lastWatchedAt',
      ExpressionAttributeValues: {
        ':progress': progress,
        ':lastWatchedAt': new Date().toISOString(),
      },
    };

    await docClient.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User progress updated successfully.' }),
    };
  } catch (error) {
    console.error('Error updating user progress:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update user progress.', error: error.message }),
    };
  }
};
