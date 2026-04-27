"use client";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/wood-texture.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#8c5430]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8c5430]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo / Brand */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl mb-6">
            <Image src="/portland-logo.png" alt="Portland Flooring Logo" width={96} height={96} className="object-cover" />
          </div>
          <h1
            className="text-3xl font-bold text-white tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Tomorrow', sans-serif" }}
          >
            Portland
          </h1>
          <p className="text-[#8c5430] text-xs font-bold tracking-[0.3em] uppercase">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-3xl p-8 shadow-2xl">
          <h2 className="text-white text-xl font-bold mb-1">Welcome back</h2>
          <p className="text-white/40 text-sm mb-8">
            Sign in to access your dashboard
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/60 focus:ring-2 focus:ring-[#8c5430]/20 transition-all text-white font-medium placeholder-white/20"
                placeholder="admin@portland.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none focus:border-[#8c5430]/60 focus:ring-2 focus:ring-[#8c5430]/20 transition-all text-white font-medium placeholder-white/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-4 bg-[#8c5430] hover:bg-[#a0653d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-[#8c5430]/20 hover:shadow-[#8c5430]/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          Portland Flooring © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
