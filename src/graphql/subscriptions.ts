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
` as GeneratedSubscription<
  APITypes.OnDeleteVideoSubscriptionVariables,
  APITypes.OnDeleteVideoSubscription
>;
export const onCreateChannel = /* GraphQL */ `subscription OnCreateChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onCreateChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChannelSubscriptionVariables,
  APITypes.OnCreateChannelSubscription
>;
export const onUpdateChannel = /* GraphQL */ `subscription OnUpdateChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onUpdateChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChannelSubscriptionVariables,
  APITypes.OnUpdateChannelSubscription
>;
export const onDeleteChannel = /* GraphQL */ `subscription OnDeleteChannel(
  $filter: ModelSubscriptionChannelFilterInput
  $owner: String
) {
  onDeleteChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChannelSubscriptionVariables,
  APITypes.OnDeleteChannelSubscription
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
` as GeneratedSubscription<
  APITypes.OnDeleteFavoriteSubscriptionVariables,
  APITypes.OnDeleteFavoriteSubscription
>;
export const onCreateFavoriteChannel = /* GraphQL */ `subscription OnCreateFavoriteChannel(
  $filter: ModelSubscriptionFavoriteChannelFilterInput
  $owner: String
) {
  onCreateFavoriteChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFavoriteChannelSubscriptionVariables,
  APITypes.OnCreateFavoriteChannelSubscription
>;
export const onUpdateFavoriteChannel = /* GraphQL */ `subscription OnUpdateFavoriteChannel(
  $filter: ModelSubscriptionFavoriteChannelFilterInput
  $owner: String
) {
  onUpdateFavoriteChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFavoriteChannelSubscriptionVariables,
  APITypes.OnUpdateFavoriteChannelSubscription
>;
export const onDeleteFavoriteChannel = /* GraphQL */ `subscription OnDeleteFavoriteChannel(
  $filter: ModelSubscriptionFavoriteChannelFilterInput
  $owner: String
) {
  onDeleteFavoriteChannel(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFavoriteChannelSubscriptionVariables,
  APITypes.OnDeleteFavoriteChannelSubscription
>;
export const onCreateUserActivity = /* GraphQL */ `subscription OnCreateUserActivity(
  $filter: ModelSubscriptionUserActivityFilterInput
  $owner: String
) {
  onCreateUserActivity(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserActivitySubscriptionVariables,
  APITypes.OnCreateUserActivitySubscription
>;
export const onUpdateUserActivity = /* GraphQL */ `subscription OnUpdateUserActivity(
  $filter: ModelSubscriptionUserActivityFilterInput
  $owner: String
) {
  onUpdateUserActivity(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserActivitySubscriptionVariables,
  APITypes.OnUpdateUserActivitySubscription
>;
export const onDeleteUserActivity = /* GraphQL */ `subscription OnDeleteUserActivity(
  $filter: ModelSubscriptionUserActivityFilterInput
  $owner: String
) {
  onDeleteUserActivity(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserActivitySubscriptionVariables,
  APITypes.OnDeleteUserActivitySubscription
>;
