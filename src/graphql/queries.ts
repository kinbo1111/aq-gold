/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    message
    userId
    read
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      message
      userId
      read
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const getVideo = /* GraphQL */ `query GetVideo($id: ID!) {
  getVideo(id: $id) {
    id
    title
    description
    tags
    category
    videoUrl
    thumbnailUrl
    vThumbnailUrl
    isForKids
    isRestricted
    playlist
    scheduleTime
    timezone
    duration
    viewCount
    favoriteCount
    channelId
    channel {
      id
      name
      description
      owner
      avatarUrl
      subscribersCount
      createdAt
      updatedAt
      __typename
    }
    isAQOriginal
    createdAt
    updatedAt
    isPublic
    owner
    favorites {
      nextToken
      __typename
    }
    userActivity {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetVideoQueryVariables, APITypes.GetVideoQuery>;
export const listVideos = /* GraphQL */ `query ListVideos(
  $filter: ModelVideoFilterInput
  $limit: Int
  $nextToken: String
) {
  listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      tags
      category
      videoUrl
      thumbnailUrl
      vThumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      channelId
      isAQOriginal
      createdAt
      updatedAt
      isPublic
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVideosQueryVariables,
  APITypes.ListVideosQuery
>;
export const videosByChannelIdAndCreatedAt = /* GraphQL */ `query VideosByChannelIdAndCreatedAt(
  $channelId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelVideoFilterInput
  $limit: Int
  $nextToken: String
) {
  videosByChannelIdAndCreatedAt(
    channelId: $channelId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      description
      tags
      category
      videoUrl
      thumbnailUrl
      vThumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      channelId
      isAQOriginal
      createdAt
      updatedAt
      isPublic
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VideosByChannelIdAndCreatedAtQueryVariables,
  APITypes.VideosByChannelIdAndCreatedAtQuery
>;
export const getChannel = /* GraphQL */ `query GetChannel($id: ID!) {
  getChannel(id: $id) {
    id
    name
    description
    owner
    avatarUrl
    subscribersCount
    createdAt
    updatedAt
    videos {
      nextToken
      __typename
    }
    favoriteChannels {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChannelQueryVariables,
  APITypes.GetChannelQuery
>;
export const listChannels = /* GraphQL */ `query ListChannels(
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      owner
      avatarUrl
      subscribersCount
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChannelsQueryVariables,
  APITypes.ListChannelsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getFavorite = /* GraphQL */ `query GetFavorite($id: ID!) {
  getFavorite(id: $id) {
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
      vThumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      channelId
      isAQOriginal
      createdAt
      updatedAt
      isPublic
      owner
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFavoriteQueryVariables,
  APITypes.GetFavoriteQuery
>;
export const listFavorites = /* GraphQL */ `query ListFavorites(
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
) {
  listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      videoId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFavoritesQueryVariables,
  APITypes.ListFavoritesQuery
>;
export const favoritesByUserIdAndVideoId = /* GraphQL */ `query FavoritesByUserIdAndVideoId(
  $userId: ID!
  $videoId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
) {
  favoritesByUserIdAndVideoId(
    userId: $userId
    videoId: $videoId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      videoId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoritesByUserIdAndVideoIdQueryVariables,
  APITypes.FavoritesByUserIdAndVideoIdQuery
>;
export const favoritesByVideoIdAndUserId = /* GraphQL */ `query FavoritesByVideoIdAndUserId(
  $videoId: ID!
  $userId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelFavoriteFilterInput
  $limit: Int
  $nextToken: String
) {
  favoritesByVideoIdAndUserId(
    videoId: $videoId
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      videoId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoritesByVideoIdAndUserIdQueryVariables,
  APITypes.FavoritesByVideoIdAndUserIdQuery
>;
export const getFavoriteChannel = /* GraphQL */ `query GetFavoriteChannel($id: ID!) {
  getFavoriteChannel(id: $id) {
    id
    userId
    channelId
    channel {
      id
      name
      description
      owner
      avatarUrl
      subscribersCount
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFavoriteChannelQueryVariables,
  APITypes.GetFavoriteChannelQuery
>;
export const listFavoriteChannels = /* GraphQL */ `query ListFavoriteChannels(
  $filter: ModelFavoriteChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  listFavoriteChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      channelId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFavoriteChannelsQueryVariables,
  APITypes.ListFavoriteChannelsQuery
>;
export const favoriteChannelsByUserIdAndChannelId = /* GraphQL */ `query FavoriteChannelsByUserIdAndChannelId(
  $userId: ID!
  $channelId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelFavoriteChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  favoriteChannelsByUserIdAndChannelId(
    userId: $userId
    channelId: $channelId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      channelId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoriteChannelsByUserIdAndChannelIdQueryVariables,
  APITypes.FavoriteChannelsByUserIdAndChannelIdQuery
>;
export const favoriteChannelsByChannelIdAndUserId = /* GraphQL */ `query FavoriteChannelsByChannelIdAndUserId(
  $channelId: ID!
  $userId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelFavoriteChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  favoriteChannelsByChannelIdAndUserId(
    channelId: $channelId
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      channelId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FavoriteChannelsByChannelIdAndUserIdQueryVariables,
  APITypes.FavoriteChannelsByChannelIdAndUserIdQuery
>;
export const getUserActivity = /* GraphQL */ `query GetUserActivity($id: ID!) {
  getUserActivity(id: $id) {
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
      vThumbnailUrl
      isForKids
      isRestricted
      playlist
      scheduleTime
      timezone
      duration
      viewCount
      favoriteCount
      channelId
      isAQOriginal
      createdAt
      updatedAt
      isPublic
      owner
      __typename
    }
    progress
    lastWatchedAt
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserActivityQueryVariables,
  APITypes.GetUserActivityQuery
>;
export const listUserActivities = /* GraphQL */ `query ListUserActivities(
  $filter: ModelUserActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      videoId
      progress
      lastWatchedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserActivitiesQueryVariables,
  APITypes.ListUserActivitiesQuery
>;
export const userActivitiesByUserIdAndVideoId = /* GraphQL */ `query UserActivitiesByUserIdAndVideoId(
  $userId: ID!
  $videoId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  userActivitiesByUserIdAndVideoId(
    userId: $userId
    videoId: $videoId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      videoId
      progress
      lastWatchedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserActivitiesByUserIdAndVideoIdQueryVariables,
  APITypes.UserActivitiesByUserIdAndVideoIdQuery
>;
export const userActivitiesByVideoIdAndUserId = /* GraphQL */ `query UserActivitiesByVideoIdAndUserId(
  $videoId: ID!
  $userId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUserActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  userActivitiesByVideoIdAndUserId(
    videoId: $videoId
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      videoId
      progress
      lastWatchedAt
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserActivitiesByVideoIdAndUserIdQueryVariables,
  APITypes.UserActivitiesByVideoIdAndUserIdQuery
>;
