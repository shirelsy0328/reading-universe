"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import {
  AUTH_USER_KEY,
  AUTH_USERS_KEY,
  MOCK_SMS_CODE,
  type AuthProviderType,
  type AuthUser,
  type StoredUser,
} from "@/lib/auth/types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  registerWithEmail: (name: string, email: string, password: string) => string | null;
  loginWithEmail: (email: string, password: string) => string | null;
  loginWithPhone: (phone: string, code: string) => string | null;
  loginWithProvider: (provider: AuthProviderType) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function saveSession(user: AuthUser) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function readSession(): AuthUser | null {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) ?? "null") as AuthUser | null;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(AUTH_USER_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setLocalUser(readSession());
    setIsHydrated(true);
  }, []);

  const user = useMemo<AuthUser | null>(() => {
    if (session?.user) {
      return {
        id: session.user.id ?? session.user.email ?? "google-user",
        name: session.user.name ?? "Google 用户",
        email: session.user.email ?? undefined,
        provider: "google",
        createdAt: new Date().toISOString(),
      };
    }
    return localUser;
  }, [session, localUser]);

  const registerWithEmail = useCallback(
    (name: string, email: string, password: string): string | null => {
      const trimmedEmail = email.trim().toLowerCase();
      if (!name.trim() || !trimmedEmail || !password) {
        return "请填写完整的注册信息。";
      }
      if (password.length < 6) {
        return "密码至少需要 6 位。";
      }

      const users = readUsers();
      if (users.some((item) => item.email?.toLowerCase() === trimmedEmail)) {
        return "该邮箱已注册，请直接登录。";
      }

      const newUser: StoredUser = {
        id: `email-${Date.now()}`,
        name: name.trim(),
        email: trimmedEmail,
        password,
        provider: "email",
        createdAt: new Date().toISOString(),
      };

      writeUsers([...users, newUser]);
      const sessionUser: AuthUser = { ...newUser, password: undefined };
      saveSession(sessionUser);
      setLocalUser(sessionUser);
      return null;
    },
    []
  );

  const loginWithEmail = useCallback((email: string, password: string): string | null => {
    const trimmedEmail = email.trim().toLowerCase();
    const matched = readUsers().find(
      (item) => item.provider === "email" && item.email?.toLowerCase() === trimmedEmail
    );

    if (!matched || matched.password !== password) {
      return "邮箱或密码不正确。";
    }

    const sessionUser: AuthUser = {
      id: matched.id,
      name: matched.name,
      email: matched.email,
      provider: "email",
      createdAt: matched.createdAt,
    };
    saveSession(sessionUser);
    setLocalUser(sessionUser);
    return null;
  }, []);

  const loginWithPhone = useCallback((phone: string, code: string): string | null => {
    const trimmedPhone = phone.trim();
    if (!/^1\d{10}$/.test(trimmedPhone)) {
      return "请输入有效的 11 位手机号。";
    }
    if (code.trim() !== MOCK_SMS_CODE) {
      return `验证码不正确。演示验证码：${MOCK_SMS_CODE}`;
    }

    const users = readUsers();
    let matched = users.find(
      (item) => item.provider === "phone" && item.phone === trimmedPhone
    );

    if (!matched) {
      matched = {
        id: `phone-${Date.now()}`,
        name: `读者 ${trimmedPhone.slice(-4)}`,
        phone: trimmedPhone,
        provider: "phone",
        createdAt: new Date().toISOString(),
      };
      writeUsers([...users, matched]);
    }

    saveSession(matched);
    setLocalUser(matched);
    return null;
  }, []);

  const loginWithProvider = useCallback((provider: AuthProviderType): string | null => {
    if (provider === "google") {
      return null;
    }
    if (provider === "wechat" || provider === "xiaohongshu") {
      return `${provider === "wechat" ? "微信" : "小红书"}登录即将开放，敬请期待。`;
    }
    return "暂不支持该登录方式。";
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setLocalUser(null);
    if (session) {
      void nextAuthSignOut({ redirect: false });
    }
  }, [session]);

  const value: AuthContextValue = {
    user,
    isLoading: !isHydrated || status === "loading",
    registerWithEmail,
    loginWithEmail,
    loginWithPhone,
    loginWithProvider,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
