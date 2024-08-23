const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  try {
    for (const record of event.Records) {
      if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
        const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb?.NewImage || {});

        const videoRecord = {
          id: newImage.id,
          scheduleTime: newImage.scheduleTime,
          isPublic: newImage.isPublic ?? false, // Default to false if isPublic is undefined
        };

        // Skip if video is already public or if the necessary data is missing
        if (videoRecord.isPublic || !videoRecord.id || !videoRecord.scheduleTime) {
          console.log(`Skipping record ${videoRecord.id} - No action needed.`);
          continue;
        }

        const now = new Date().toISOString();

        // Check if the scheduled time has passed
        if (now >= videoRecord.scheduleTime) {
          // Update the video to be public
          await updateVideoVisibility(videoRecord.id);
        }
      }
    }

    callback(null, `Successfully processed ${event.Records.length} records.`);
  } catch (error) {
    console.error('Error processing DynamoDB stream event:', error);
    callback(error);
  }
};

/**
 * Updates the video record in DynamoDB to set `isPublic` to true.
 *
 * @param {string} id - The ID of the video to update
 */
async function updateVideoVisibility(id) {
  const params = {
    TableName: process.env.API_360VIDEOPLATFORM_VIDEOTABLE_NAME,
    Key: { id },
    UpdateExpression: 'SET isPublic = :true',
    ExpressionAttributeValues: { ':true': true },
  };

  try {
    await docClient.update(params).promise();
    console.log(`Video ${id} is now public.`);
  } catch (error) {
    console.error(`Failed to update video ${id}:`, error);
    throw new Error(`Failed to update video visibility for ID ${id}`);
  }
}
