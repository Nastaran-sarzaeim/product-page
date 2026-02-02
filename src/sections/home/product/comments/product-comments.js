"use client";

import { useEffect, useState } from "react";
import styles from "./ProductComments.module.css";
import { useUser } from "@/context/UserContext";

export default function ProductComments({ productId }) {
  const { user } = useUser();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`comments_${productId}`);
    if (stored) setComments(JSON.parse(stored));
  }, [productId]);

  const saveComments = (list) => {
    setComments(list);
    localStorage.setItem(
      `comments_${productId}`,
      JSON.stringify(list)
    );
  };

  const getUserName = () => {
    if (!user) return "کاربر";

    return (
      user.firstName + " " + user.lastName ||
      "کاربر"
    );
  };

  const handleSubmit = () => {
    if (!user) {
      alert("برای ثبت نظر وارد شوید");
      return;
    }

    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      name: getUserName(),
      text,
      date: new Date().toLocaleDateString("fa-IR"),
    };

    const updated = [newComment, ...comments];
    saveComments(updated);
    setText("");
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>نظرات کاربران</h3>

      <div className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="نظر خود را بنویسید..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className={styles.submitBtn}
        >
          ثبت نظر
        </button>
      </div>

      <div className={styles.list}>
        {comments.length === 0 ? (
          <p className={styles.empty}>
            هنوز نظری ثبت نشده است
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.date}>{c.date}</span>
              </div>

              <p className={styles.commentText}>
                {c.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
