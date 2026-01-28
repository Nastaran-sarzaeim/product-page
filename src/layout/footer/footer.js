"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div>
                    <Link href="/" className={styles.brand}>فروشگاه پوشاک</Link>
                    <p className={styles.address}>
                        خیابان باقری، پلاک ۴۰۰، طبقه دوم، سوئیت ۲۰۰
                    </p>
                </div>

                <div>
                    <h4 className={styles.title}>لینک‌ها</h4>
                    <ul className={styles.linkList}>
                        <li>خانه</li>
                        <li>فروشگاه</li>
                        <li>درباره ما</li>
                        <li>تماس با ما</li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.title}>راهنما</h4>
                    <ul className={styles.linkList}>
                        <li>روش‌های پرداخت</li>
                        <li>مرجوعی کالا</li>
                        <li>سیاست حفظ حریم خصوصی</li>
                    </ul>
                </div>

                <div>
                    <h4 className={styles.title}>خبرنامه</h4>
                    <div className={styles.newsletter}>
                        <input
                            type="email"
                            placeholder="ایمیل خود را وارد کنید"
                            className={styles.input}
                        />
                        <button className={styles.button}>اشتراک</button>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                © ۱۴۰۳ فروشگاه پوشاک تمام حقوق محفوظ است.
            </div>
        </footer>
    );
}
