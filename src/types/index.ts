export interface UserAttributes {
  sub: string;
  email: string;
  nickname?: string;
  [key: string]: string | undefined;
}