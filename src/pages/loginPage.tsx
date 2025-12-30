import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authServices/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/productPage");
    },
    onError: () => {
      setLocalError("Неверный логин или пароль");
    },
  });

  const handleLogin = () => {
    setLocalError("");
    if (!userName || !password) {
      setLocalError("Заполните все поля");
      return;
    }

    mutate({ userName, password });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-900">
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-10 w-[380px] flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white mb-8">
          Login
        </h1>

        <div className="flex flex-col gap-5 w-full">
          <input
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handleLogin}
            disabled={isPending}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Login"}
          </button>

          {localError && (
            <p className="text-red-400 text-center text-sm">
              {localError}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
