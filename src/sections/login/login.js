"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const { login } = useUser();

  const [mode, setMode] = useState("login"); 

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (mode === "register") {
      if (!firstName || !lastName || !username || !password || !repeatPassword) {
        alert("همه فیلدها را پر کنید")
        return;
      }

      if (password !== repeatPassword) {
        alert("رمزها یکسان نیستند!")
        return;
      }

      const exists = users.find(u => u.username === username);
      if (exists) {
        alert("این نام کاربری قبلا ثبت شده")
        return;
      }

      const newUser = {
        firstName,
        lastName,
        username,
        password,
        role: "user",
        cart: []
      };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      login(newUser);
      alert("ثبت‌نام موفق! خوش آمدی")
      setTimeout(() => { window.location.href = "/"; }, 1000);
      return;
    }

    const foundUser = users.find(u => u.username === username && u.password === password);
    if (!foundUser) {
      alert("نام کاربری یا رمز اشتباه است")
      return;
    }

    login(foundUser);
    alert("ورود موفق! خوش آمدی")
    setTimeout(() => { window.location.href = "/"; }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          {mode === "login" ? "ورود" : "ثبت‌نام"}
        </h2>

        {mode === "register" && (
          <>
            <input
              className={styles.input}
              placeholder="نام"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="نام خانوادگی"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          className={styles.input}
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className={styles.passwordWrapper}>
          <input
            type="password"
            className={styles.input}
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {mode === "register" && (
          <div className={styles.passwordWrapper}>
            <input
              type="password"
              className={styles.input}
              placeholder="تکرار رمز عبور"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        )}

        <button className={styles.button} onClick={handleSubmit}>
          ادامه
        </button>

        <p
          className={styles.toggleText}
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setFirstName(""); setLastName(""); setUsername(""); setPassword(""); setRepeatPassword("");
          }}
        >
          {mode === "login" ? "ثبت‌نام نداری؟ اینجا کلیک کن" : "اکانت داری؟ ورود"}
        </p>
      </div>
    </div>
  );
}
