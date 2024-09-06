/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createVideo = /* GraphQL */ `mutation CreateVideo(
  $input: CreateVideoInput!
  $condition: ModelVideoConditionInput
) {
  createVideo(input: $input, condition: $condition) {
    id
    title
    description
    tags
    category
    videoUrl
    thumbnailUrl
    isForKids
    isRestricted
    playlist
    scheduleTime
    timezone
    duration
    viewCount
    favoriteCount
    createdAt
    updatedAt
    owner
    favorites {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateVideoMutationVariables,
  APITypes.CreateVideoMutation
>;
export const updateVideo = /* GraphQL */ `mutation UpdateVideo(
  $input: UpdateVideoInput!
  $condition: ModelVideoConditionInput
) {
  updateVideo(input: $input, condition: $condition) {
    id
    title
    description
    tags
    category
    videoUrl
    thumbnailUrl
    isForKids
    isRestricted
    playlist
    scheduleTime
    timezone
    duration
    viewCount
    favoriteCount
    createdAt
    updatedAt
    owner
    favorites {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateVideoMutationVariables,
  APITypes.UpdateVideoMutation
>;
export const deleteVideo = /* GraphQL */ `mutation DeleteVideo(
  $input: DeleteVideoInput!
  $condition: ModelVideoConditionInput
) {
  deleteVideo(input: $input, condition: $condition) {
    id
    title
    description
    tags
    category
    videoUrl
    thumbnailUrl
    isForKids
    isRestricted
    playlist
    scheduleTime
    timezone
    duration
    viewCount
    favoriteCount
    createdAt
    updatedAt
    owner
    favorites {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteVideoMutationVariables,
  APITypes.DeleteVideoMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    email
    favoriteVideos {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    email
    favoriteVideos {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    username
    email
    favoriteVideos {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createFavorite = /* GraphQL */ `mutation CreateFavorite(
  $input: CreateFavoriteInput!
  $condition: ModelFavoriteConditionInput
) {
  createFavorite(input: $input, condition: $condition) {
    id
    userId
    videoId
    video {
      id
      title
      description
      tags
      category
      videoUrl
      thumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFavoriteMutationVariables,
  APITypes.CreateFavoriteMutation
>;
export const updateFavorite = /* GraphQL */ `mutation UpdateFavorite(
  $input: UpdateFavoriteInput!
  $condition: ModelFavoriteConditionInput
) {
  updateFavorite(input: $input, condition: $condition) {
    id
    userId
    videoId
    video {
      id
      title
      description
      tags
      category
      videoUrl
      thumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFavoriteMutationVariables,
  APITypes.UpdateFavoriteMutation
>;
export const deleteFavorite = /* GraphQL */ `mutation DeleteFavorite(
  $input: DeleteFavoriteInput!
  $condition: ModelFavoriteConditionInput
) {
  deleteFavorite(input: $input, condition: $condition) {
    id
    userId
    videoId
    video {
      id
      title
      description
      tags
      category
      videoUrl
      thumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      createdAt
      updatedAt
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFavoriteMutationVariables,
  APITypes.DeleteFavoriteMutation
  >;

  export const incrementViewCount = /* GraphQL */ `
  mutation IncrementViewCount($id: ID!, $viewCount: Int!) {
    updateVideo(input: { id: $id, viewCount: $viewCount }) {
      id
      viewCount
    }
  }
`;

  export const managementFavoriteCount = /* GraphQL */ `
  mutation ManagementFavoriteCount($id: ID!, $favoriteCount: Int!) {
    updateVideo(input: { id: $id, favoriteCount: $favoriteCount }) {
      id
      favoriteCount
    }
  }
`;

export const editVideoTitle = /* GraphQL */ `
  mutation EditVideoTitle($id: ID!, $title: String) {
    updateVideo(input: { id: $id, title: $title }) {
      id
      title
    }
  }
`;

export const deleteVideoByID = /* GraphQL */ `
  mutation DeleteVideoByID($id: ID!) {
    deleteVideo(input: { id: $id }) {
      id
    }
  }
`;

export const updateUserProgressMutation = /* GraphQL */ `
  mutation UpdateUserProgress($userId: ID!, $videoId: ID!, $progress: Int!) {
    updateUserProgress(userId: $userId, videoId: $videoId, progress: $progress) {
      id
      userId
      videoId
      progress
      lastWatchedAt
    }
  }
`;


export const getUserActivity = /* GraphQL */ `
query GetUserActivity($userId: ID!, $videoId: ID!) {
  listUserActivities(filter: {
    userId: { eq: $userId }
    videoId: { eq: $videoId }
  }) {
    items {
      id
      progress
      lastWatchedAt
    }
  }
}
`;

export const listUserActivities = /* GraphQL */ `
  query ListUserActivities($userId: ID!) {
    listUserActivities(filter: { userId: { eq: $userId } }) {
      items {
        id
        userId
        videoId
        progress
        lastWatchedAt
        createdAt
        video {
          id
          title
          videoUrl
          thumbnailUrl
          duration
        }
      }
      nextToken
    }
  }
`;


export const updateUserProgress = /* GraphQL */ `
mutation UpdateUserProgress($input: UpdateUserActivityInput!) {
  updateUserActivity(input: $input) {
    id
    progress
    lastWatchedAt
  }
}
`;

export const createUserProgress = /* GraphQL */ `
mutation CreateUserProgress($input: CreateUserActivityInput!) {
  createUserActivity(input: $input) {
    id
    userId
    videoId
    progress
    lastWatchedAt
  }
}
`;

export const videosByFavoriteCount = /* GraphQL */`
  query VideosByFavoriteCount() {
    listVideos(limit: 3) {
      items {
        id
      }
    }
  }
`;

export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
      id
      name
      description
      owner
      avatarUrl
      subscribersCount
      createdAt
      updatedAt
    }
  }
`;

export const getUserChannel = /* GraphQL */ `
  query GetUserChannel($userId: ID!) {
    listChannels(filter: { owner: { eq: $userId } }) {
      items {
        id
        name
        description
        avatarUrl
      }
    }
  }
`;

