"use client";

import React from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
    const { id, name, variants, basePrice, oldPrice, image } = product;

    const firstVariant = variants && variants.length > 0 ? variants[0] : null;
    const displayImage = firstVariant ? firstVariant.image : image;
    const displayPrice = firstVariant ? firstVariant.price : basePrice;

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={displayImage}
                    alt={name}
                    className={styles.image}
                />

                <Link
                    href={`/shop/${id}`}
                    className={styles.overlay}
                >
                    مشاهده جزئیات
                </Link>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{name}</h3>

                <div className={styles.priceRow}>
                    <p className={styles.price}>
                        {displayPrice} تومان
                    </p>

                    {oldPrice && (
                        <p className={styles.oldPrice}>
                            {oldPrice} تومان
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.addBtn}
                >
                    اضافه کردن به سبد
                </button>
            </div>
        </div>
    );
}
