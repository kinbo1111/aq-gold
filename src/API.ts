/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVideoInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  tags?: Array< string | null > | null,
  category?: string | null,
  videoUrl: string,
  thumbnailUrl?: string | null,
  isForKids?: boolean | null,
  isRestricted?: boolean | null,
  playlist?: string | null,
  scheduleTime?: string | null,
  timezone?: string | null,
  duration: number,
  viewCount: number,
  favoriteCount: number,
  isAQOriginal?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  isPublic: boolean,
  owner?: string | null,
};

export type ModelVideoConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  category?: ModelStringInput | null,
  videoUrl?: ModelStringInput | null,
  thumbnailUrl?: ModelStringInput | null,
  isForKids?: ModelBooleanInput | null,
  isRestricted?: ModelBooleanInput | null,
  playlist?: ModelStringInput | null,
  scheduleTime?: ModelStringInput | null,
  timezone?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  viewCount?: ModelIntInput | null,
  favoriteCount?: ModelIntInput | null,
  isAQOriginal?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelVideoConditionInput | null > | null,
  or?: Array< ModelVideoConditionInput | null > | null,
  not?: ModelVideoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Video = {
  __typename: "Video",
  id: string,
  title: string,
  description?: string | null,
  tags?: Array< string | null > | null,
  category?: string | null,
  videoUrl: string,
  thumbnailUrl?: string | null,
  isForKids?: boolean | null,
  isRestricted?: boolean | null,
  playlist?: string | null,
  scheduleTime?: string | null,
  timezone?: string | null,
  duration: number,
  viewCount: number,
  favoriteCount: number,
  isAQOriginal?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  isPublic: boolean,
  owner?: string | null,
  favorites?: ModelFavoriteConnection | null,
  userActivity?: ModelUserActivityConnection | null,
};

export type ModelFavoriteConnection = {
  __typename: "ModelFavoriteConnection",
  items:  Array<Favorite | null >,
  nextToken?: string | null,
};

export type Favorite = {
  __typename: "Favorite",
  id: string,
  userId: string,
  videoId: string,
  video?: Video | null,
  createdAt?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type ModelUserActivityConnection = {
  __typename: "ModelUserActivityConnection",
  items:  Array<UserActivity | null >,
  nextToken?: string | null,
};

export type UserActivity = {
  __typename: "UserActivity",
  id: string,
  userId: string,
  videoId: string,
  video?: Video | null,
  progress?: number | null,
  lastWatchedAt?: string | null,
  createdAt?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateVideoInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  tags?: Array< string | null > | null,
  category?: string | null,
  videoUrl?: string | null,
  thumbnailUrl?: string | null,
  isForKids?: boolean | null,
  isRestricted?: boolean | null,
  playlist?: string | null,
  scheduleTime?: string | null,
  timezone?: string | null,
  duration?: number | null,
  viewCount?: number | null,
  favoriteCount?: number | null,
  isAQOriginal?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  isPublic?: boolean | null,
  owner?: string | null,
};

export type DeleteVideoInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  favoriteVideos?: ModelFavoriteConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateFavoriteInput = {
  id?: string | null,
  userId: string,
  videoId: string,
  createdAt?: string | null,
};

export type ModelFavoriteConditionInput = {
  userId?: ModelIDInput | null,
  videoId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelFavoriteConditionInput | null > | null,
  or?: Array< ModelFavoriteConditionInput | null > | null,
  not?: ModelFavoriteConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateFavoriteInput = {
  id: string,
  userId?: string | null,
  videoId?: string | null,
  createdAt?: string | null,
};

export type DeleteFavoriteInput = {
  id: string,
};

export type CreateUserActivityInput = {
  id?: string | null,
  userId: string,
  videoId: string,
  progress?: number | null,
  lastWatchedAt?: string | null,
  createdAt?: string | null,
};

export type ModelUserActivityConditionInput = {
  userId?: ModelIDInput | null,
  videoId?: ModelIDInput | null,
  progress?: ModelIntInput | null,
  lastWatchedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelUserActivityConditionInput | null > | null,
  or?: Array< ModelUserActivityConditionInput | null > | null,
  not?: ModelUserActivityConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateUserActivityInput = {
  id: string,
  userId?: string | null,
  videoId?: string | null,
  progress?: number | null,
  lastWatchedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteUserActivityInput = {
  id: string,
};

export type ModelVideoFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  category?: ModelStringInput | null,
  videoUrl?: ModelStringInput | null,
  thumbnailUrl?: ModelStringInput | null,
  isForKids?: ModelBooleanInput | null,
  isRestricted?: ModelBooleanInput | null,
  playlist?: ModelStringInput | null,
  scheduleTime?: ModelStringInput | null,
  timezone?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  viewCount?: ModelIntInput | null,
  favoriteCount?: ModelIntInput | null,
  isAQOriginal?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  isPublic?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelVideoFilterInput | null > | null,
  or?: Array< ModelVideoFilterInput | null > | null,
  not?: ModelVideoFilterInput | null,
};

export type ModelVideoConnection = {
  __typename: "ModelVideoConnection",
  items:  Array<Video | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelFavoriteFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  videoId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFavoriteFilterInput | null > | null,
  or?: Array< ModelFavoriteFilterInput | null > | null,
  not?: ModelFavoriteFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserActivityFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  videoId?: ModelIDInput | null,
  progress?: ModelIntInput | null,
  lastWatchedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserActivityFilterInput | null > | null,
  or?: Array< ModelUserActivityFilterInput | null > | null,
  not?: ModelUserActivityFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionVideoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  tags?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  videoUrl?: ModelSubscriptionStringInput | null,
  thumbnailUrl?: ModelSubscriptionStringInput | null,
  isForKids?: ModelSubscriptionBooleanInput | null,
  isRestricted?: ModelSubscriptionBooleanInput | null,
  playlist?: ModelSubscriptionStringInput | null,
  scheduleTime?: ModelSubscriptionStringInput | null,
  timezone?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionIntInput | null,
  viewCount?: ModelSubscriptionIntInput | null,
  favoriteCount?: ModelSubscriptionIntInput | null,
  isAQOriginal?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  isPublic?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionVideoFilterInput | null > | null,
  or?: Array< ModelSubscriptionVideoFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionFavoriteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  videoId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFavoriteFilterInput | null > | null,
  or?: Array< ModelSubscriptionFavoriteFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionUserActivityFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  videoId?: ModelSubscriptionIDInput | null,
  progress?: ModelSubscriptionIntInput | null,
  lastWatchedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserActivityFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserActivityFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateVideoMutationVariables = {
  input: CreateVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type CreateVideoMutation = {
  createVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateVideoMutationVariables = {
  input: UpdateVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type UpdateVideoMutation = {
  updateVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteVideoMutationVariables = {
  input: DeleteVideoInput,
  condition?: ModelVideoConditionInput | null,
};

export type DeleteVideoMutation = {
  deleteVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateFavoriteMutationVariables = {
  input: CreateFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type CreateFavoriteMutation = {
  createFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateFavoriteMutationVariables = {
  input: UpdateFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type UpdateFavoriteMutation = {
  updateFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteFavoriteMutationVariables = {
  input: DeleteFavoriteInput,
  condition?: ModelFavoriteConditionInput | null,
};

export type DeleteFavoriteMutation = {
  deleteFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserActivityMutationVariables = {
  input: CreateUserActivityInput,
  condition?: ModelUserActivityConditionInput | null,
};

export type CreateUserActivityMutation = {
  createUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserActivityMutationVariables = {
  input: UpdateUserActivityInput,
  condition?: ModelUserActivityConditionInput | null,
};

export type UpdateUserActivityMutation = {
  updateUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserActivityMutationVariables = {
  input: DeleteUserActivityInput,
  condition?: ModelUserActivityConditionInput | null,
};

export type DeleteUserActivityMutation = {
  deleteUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetVideoQueryVariables = {
  id: string,
};

export type GetVideoQuery = {
  getVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListVideosQueryVariables = {
  filter?: ModelVideoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVideosQuery = {
  listVideos?:  {
    __typename: "ModelVideoConnection",
    items:  Array< {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFavoriteQueryVariables = {
  id: string,
};

export type GetFavoriteQuery = {
  getFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListFavoritesQueryVariables = {
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFavoritesQuery = {
  listFavorites?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userId: string,
      videoId: string,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FavoritesByUserIdAndVideoIdQueryVariables = {
  userId: string,
  videoId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FavoritesByUserIdAndVideoIdQuery = {
  favoritesByUserIdAndVideoId?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userId: string,
      videoId: string,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FavoritesByVideoIdAndUserIdQueryVariables = {
  videoId: string,
  userId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFavoriteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FavoritesByVideoIdAndUserIdQuery = {
  favoritesByVideoIdAndUserId?:  {
    __typename: "ModelFavoriteConnection",
    items:  Array< {
      __typename: "Favorite",
      id: string,
      userId: string,
      videoId: string,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserActivityQueryVariables = {
  id: string,
};

export type GetUserActivityQuery = {
  getUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUserActivitiesQueryVariables = {
  filter?: ModelUserActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserActivitiesQuery = {
  listUserActivities?:  {
    __typename: "ModelUserActivityConnection",
    items:  Array< {
      __typename: "UserActivity",
      id: string,
      userId: string,
      videoId: string,
      progress?: number | null,
      lastWatchedAt?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserActivitiesByUserIdAndVideoIdQueryVariables = {
  userId: string,
  videoId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserActivitiesByUserIdAndVideoIdQuery = {
  userActivitiesByUserIdAndVideoId?:  {
    __typename: "ModelUserActivityConnection",
    items:  Array< {
      __typename: "UserActivity",
      id: string,
      userId: string,
      videoId: string,
      progress?: number | null,
      lastWatchedAt?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserActivitiesByVideoIdAndUserIdQueryVariables = {
  videoId: string,
  userId?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserActivitiesByVideoIdAndUserIdQuery = {
  userActivitiesByVideoIdAndUserId?:  {
    __typename: "ModelUserActivityConnection",
    items:  Array< {
      __typename: "UserActivity",
      id: string,
      userId: string,
      videoId: string,
      progress?: number | null,
      lastWatchedAt?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateVideoSubscriptionVariables = {
  filter?: ModelSubscriptionVideoFilterInput | null,
  owner?: string | null,
};

export type OnCreateVideoSubscription = {
  onCreateVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateVideoSubscriptionVariables = {
  filter?: ModelSubscriptionVideoFilterInput | null,
  owner?: string | null,
};

export type OnUpdateVideoSubscription = {
  onUpdateVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteVideoSubscriptionVariables = {
  filter?: ModelSubscriptionVideoFilterInput | null,
  owner?: string | null,
};

export type OnDeleteVideoSubscription = {
  onDeleteVideo?:  {
    __typename: "Video",
    id: string,
    title: string,
    description?: string | null,
    tags?: Array< string | null > | null,
    category?: string | null,
    videoUrl: string,
    thumbnailUrl?: string | null,
    isForKids?: boolean | null,
    isRestricted?: boolean | null,
    playlist?: string | null,
    scheduleTime?: string | null,
    timezone?: string | null,
    duration: number,
    viewCount: number,
    favoriteCount: number,
    isAQOriginal?: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    isPublic: boolean,
    owner?: string | null,
    favorites?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    userActivity?:  {
      __typename: "ModelUserActivityConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    favoriteVideos?:  {
      __typename: "ModelFavoriteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateFavoriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteFilterInput | null,
  owner?: string | null,
};

export type OnCreateFavoriteSubscription = {
  onCreateFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateFavoriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFavoriteSubscription = {
  onUpdateFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteFavoriteSubscriptionVariables = {
  filter?: ModelSubscriptionFavoriteFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFavoriteSubscription = {
  onDeleteFavorite?:  {
    __typename: "Favorite",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserActivitySubscriptionVariables = {
  filter?: ModelSubscriptionUserActivityFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserActivitySubscription = {
  onCreateUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserActivitySubscriptionVariables = {
  filter?: ModelSubscriptionUserActivityFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserActivitySubscription = {
  onUpdateUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserActivitySubscriptionVariables = {
  filter?: ModelSubscriptionUserActivityFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserActivitySubscription = {
  onDeleteUserActivity?:  {
    __typename: "UserActivity",
    id: string,
    userId: string,
    videoId: string,
    video?:  {
      __typename: "Video",
      id: string,
      title: string,
      description?: string | null,
      tags?: Array< string | null > | null,
      category?: string | null,
      videoUrl: string,
      thumbnailUrl?: string | null,
      isForKids?: boolean | null,
      isRestricted?: boolean | null,
      playlist?: string | null,
      scheduleTime?: string | null,
      timezone?: string | null,
      duration: number,
      viewCount: number,
      favoriteCount: number,
      isAQOriginal?: boolean | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      isPublic: boolean,
      owner?: string | null,
    } | null,
    progress?: number | null,
    lastWatchedAt?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
