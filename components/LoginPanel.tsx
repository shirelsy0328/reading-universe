"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { MOCK_SMS_CODE } from "@/lib/auth/types";

type Tab = "login" | "register";
type Method = "email" | "phone";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#07C160"
        d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.597-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797 0-3.253 1.47-3.253 3.285 0 1.816 1.456 3.285 3.253 3.285.478 0 .935-.1 1.35-.28l1.51.49-.39-1.47a2.996 2.996 0 0 0 1.12-2.337c0-1.815-1.456-3.285-3.253-3.285zm-1.85 2.323a.486.486 0 1 1 0-.972.486.486 0 0 1 0 .972zm3.7 0a.486.486 0 1 1 0-.972.486.486 0 0 1 0 .972z"
      />
    </svg>
  );
}

function XiaohongshuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#FF2442"
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM9.726 5.123a.403.403 0 0 0-.241 0L5.337 7.577a.403.403 0 0 0-.241.377v3.927a.403.403 0 0 0 .241.377l4.148 1.933a.403.403 0 0 0 .241 0l4.148-1.933a.403.403 0 0 0 .241-.377V7.954a.403.403 0 0 0-.241-.377L9.726 5.123Z"
      />
    </svg>
  );
}

export default function LoginPanel() {
  const router = useRouter();
  const {
    registerWithEmail,
    loginWithEmail,
    loginWithPhone,
    loginWithProvider,
    user,
  } = useAuth();

  const [tab, setTab] = useState<Tab>("login");
  const [method, setMethod] = useState<Method>("email");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-brand-card px-8 py-12 text-center shadow-elegant md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-accent">Welcome</p>
        <h1 className="mt-4 font-serif text-2xl text-brand-text">你好，{user.name}</h1>
        <p className="mt-3 text-sm text-brand-text/50">
          已通过{user.provider === "google" ? " Google" : user.provider === "phone" ? "手机号" : "邮箱"}登录
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand-accent px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          进入阅读宇宙
        </Link>
      </div>
    );
  }

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (tab === "login") {
        const adminResponse = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ email, password }),
        });

        if (adminResponse.ok) {
          window.location.assign("/admin");
          return;
        }

        if (adminResponse.status === 401) {
          const data = (await adminResponse.json()) as { error?: string; isAdmin?: boolean };
          if (data.isAdmin) {
            setError(data.error ?? "管理员账号或密码不正确。");
            return;
          }
        } else if (!adminResponse.ok) {
          const data = (await adminResponse.json().catch(() => null)) as { error?: string } | null;
          setError(data?.error ?? "登录失败，请稍后再试。");
          return;
        }
      }

      const result =
        tab === "register"
          ? registerWithEmail(name, email, password)
          : loginWithEmail(email, password);

      if (result) {
        setError(result);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("网络错误，请确认开发服务器正在运行后重试。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const result = loginWithPhone(phone, code);
    if (result) {
      setError(result);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleSocialLogin = async (provider: "google" | "wechat" | "xiaohongshu") => {
    setError(null);
    setMessage(null);

    const result = loginWithProvider(provider);
    if (result) {
      setMessage(result);
      return;
    }

    if (provider === "google") {
      await signIn("google", { callbackUrl: "/" });
    }
  };

  const inputClass =
    "w-full rounded-2xl bg-brand-bg px-4 py-3.5 text-sm text-brand-text outline-none placeholder:text-brand-text/35 md:text-base";

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-brand-card px-6 py-10 shadow-elegant md:px-10 md:py-12">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-brand-accent">
        Join Us
      </p>
      <h1 className="mt-4 text-center font-serif text-3xl text-brand-text">
        {tab === "login" ? "登录" : "注册"}
      </h1>
      <p className="mt-3 text-center text-sm text-brand-text/50">
        加入 READING.UNIVERSE 阅读社区
      </p>

      <div className="mt-8 flex rounded-full bg-brand-bg p-1">
        {(["login", "register"] as Tab[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTab(item);
              setError(null);
              setMessage(null);
            }}
            className={`flex-1 rounded-full py-2.5 text-sm transition-colors ${
              tab === item
                ? "bg-brand-card font-medium text-brand-text shadow-sm"
                : "text-brand-text/45"
            }`}
          >
            {item === "login" ? "登录" : "注册"}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {(["email", "phone"] as Method[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMethod(item)}
            className={`rounded-2xl py-2.5 text-sm transition-colors ${
              method === item
                ? "bg-brand-accent/10 font-medium text-brand-accent"
                : "text-brand-text/45 hover:text-brand-text"
            }`}
          >
            {item === "email" ? "邮箱" : "手机号"}
          </button>
        ))}
      </div>

      {method === "email" ? (
        <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
          {tab === "register" && (
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="昵称"
              className={inputClass}
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="邮箱地址"
            className={inputClass}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="密码（至少 6 位）"
            className={inputClass}
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-accent py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "登录中…" : tab === "login" ? "邮箱登录" : "邮箱注册"}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="11 位手机号"
            className={inputClass}
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="验证码"
              className={`${inputClass} flex-1`}
              required
            />
            <button
              type="button"
              onClick={() => setMessage(`演示验证码：${MOCK_SMS_CODE}`)}
              className="shrink-0 rounded-2xl bg-brand-bg px-4 text-xs text-brand-accent transition-colors hover:bg-brand-accent/10 md:text-sm"
            >
              获取验证码
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-brand-accent py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            手机号登录
          </button>
        </form>
      )}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-brand-text/10" />
        <span className="text-xs text-brand-text/35">其他方式</span>
        <div className="h-px flex-1 bg-brand-text/10" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => void handleSocialLogin("google")}
          className="flex flex-col items-center gap-2 rounded-2xl bg-brand-bg py-4 transition-colors hover:bg-brand-accent/5"
          title="Google 登录"
        >
          <GoogleIcon />
          <span className="text-[10px] text-brand-text/50">Google</span>
        </button>
        <button
          type="button"
          onClick={() => void handleSocialLogin("wechat")}
          className="flex flex-col items-center gap-2 rounded-2xl bg-brand-bg py-4 transition-colors hover:bg-brand-accent/5"
          title="微信登录"
        >
          <WeChatIcon />
          <span className="text-[10px] text-brand-text/50">微信</span>
        </button>
        <button
          type="button"
          onClick={() => void handleSocialLogin("xiaohongshu")}
          className="flex flex-col items-center gap-2 rounded-2xl bg-brand-bg py-4 transition-colors hover:bg-brand-accent/5"
          title="小红书登录"
        >
          <XiaohongshuIcon />
          <span className="text-[10px] text-brand-text/50">小红书</span>
        </button>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm text-red-500/80" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 text-center text-sm text-brand-accent/80" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
