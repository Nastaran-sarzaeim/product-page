"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./UserPanel.module.css";
import { useUser } from "@/context/UserContext";

export default function UserPanel() {
  const { user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={styles.wrapper} ref={panelRef}>
      <div
        className={styles.trigger}
        onClick={() => setOpen((p) => !p)}
      >
        <img
          src="/avatar/avatar_1.png"
          className={styles.avatar}
          alt="avatar"
        />
        <p className={styles.title}>پنل کاربری</p>
      </div>

      {open && (
        <div className={styles.panel}>
          <div className={styles.arrow}></div>

          <div>
            <h4 className={styles.username}>{user.username}</h4>
          </div>

          <div className={styles.divider}></div>

          <Link
            href={"/profile"}
            className={styles.link}
            onClick={() => setOpen(false)}
          >
            پنل کاربری
          </Link>

          <button
            className={styles.logout}
            onClick={handleLogout}
          >
            خروج
          </button>
        </div>
      )}
    </div>
  );
}
