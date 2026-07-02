export type AuthProviderType =
  | "email"
  | "phone"
  | "google"
  | "wechat"
  | "xiaohongshu";

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  provider: AuthProviderType;
  createdAt: string;
}

export interface StoredUser extends AuthUser {
  password?: string;
}

export const AUTH_USER_KEY = "reading-universe-auth-user";
export const AUTH_USERS_KEY = "reading-universe-auth-users";

export const COMING_SOON_PROVIDERS: AuthProviderType[] = ["wechat", "xiaohongshu"];

export const MOCK_SMS_CODE = "123456";
