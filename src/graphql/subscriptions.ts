/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateVideo = /* GraphQL */ `subscription OnCreateVideo(
  $filter: ModelSubscriptionVideoFilterInput
  $owner: String
) {
  onCreateVideo(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVideoSubscriptionVariables,
  APITypes.OnCreateVideoSubscription
>;
export const onUpdateVideo = /* GraphQL */ `subscription OnUpdateVideo(
  $filter: ModelSubscriptionVideoFilterInput
  $owner: String
) {
  onUpdateVideo(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVideoSubscriptionVariables,
  APITypes.OnUpdateVideoSubscription
>;
export const onDeleteVideo = /* GraphQL */ `subscription OnDeleteVideo(
  $filter: ModelSubscriptionVideoFilterInput
  $owner: String
) {
  onDeleteVideo(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVideoSubscriptionVariables,
  APITypes.OnDeleteVideoSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateFavorite = /* GraphQL */ `subscription OnCreateFavorite(
  $filter: ModelSubscriptionFavoriteFilterInput
  $owner: String
) {
  onCreateFavorite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFavoriteSubscriptionVariables,
  APITypes.OnCreateFavoriteSubscription
>;
export const onUpdateFavorite = /* GraphQL */ `subscription OnUpdateFavorite(
  $filter: ModelSubscriptionFavoriteFilterInput
  $owner: String
) {
  onUpdateFavorite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFavoriteSubscriptionVariables,
  APITypes.OnUpdateFavoriteSubscription
>;
export const onDeleteFavorite = /* GraphQL */ `subscription OnDeleteFavorite(
  $filter: ModelSubscriptionFavoriteFilterInput
  $owner: String
) {
  onDeleteFavorite(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFavoriteSubscriptionVariables,
  APITypes.OnDeleteFavoriteSubscription
>;
