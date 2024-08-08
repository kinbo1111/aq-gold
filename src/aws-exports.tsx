const awsconfig = {
  aws_project_region: 'ap-northeast-1', // Your AWS region
  aws_cognito_identity_pool_id: 'ap-northeast-1:84727d44-4665-4284-b5bb-2395122283be', // Identity Pool ID
  aws_cognito_region: 'ap-northeast-1', // Region for Cognito
  aws_user_pools_id: 'ap-northeast-1_MdS7ZKbn0', // User Pool ID
  aws_user_pools_web_client_id: '5iq3iatilp2admks7590pa6gqf', // App Client ID
  oauth: {}, // OAuth configuration if using
  aws_appsync_graphqlEndpoint: 'https://nnmyxvrtxfdxjpdwd4qjo25mxe.appsync-api.ap-northeast-1.amazonaws.com/graphql', // GraphQL endpoint
  aws_appsync_region: 'ap-northeast-1', // AppSync region
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS', // Auth type for AppSync
  aws_user_files_s3_bucket: 'aq-frontend-assets', // S3 bucket for user files
  aws_user_files_s3_bucket_region: 'ap-northeast-1', // S3 bucket region
};

export default awsconfig;
