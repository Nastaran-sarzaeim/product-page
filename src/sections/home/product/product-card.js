"use client";

import React from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { formatPrice } from "@/utils/utils";
import { useUser } from "@/context/UserContext";

export default function ProductCard({ product }) {
    const { id, name, variants, basePrice, oldPrice, image } = product;
    const { user, updateCart } = useUser();

    const firstVariant = variants && variants.length > 0 ? variants[0] : null;
    const displayImage = firstVariant ? firstVariant.image : image;
    const displayPrice = firstVariant ? firstVariant.price : basePrice;

    const handleAddToCart = () => {
        if (!user) {
            alert("لطفاً ابتدا وارد شوید!")
            return;
        }

        const cart = user.cart ? [...user.cart] : [];
        const existingIndex = cart.findIndex(item => item.id === id);

        if (existingIndex !== -1) {
            cart[existingIndex].qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        updateCart(cart);
        alert(`محصول "${name}" به سبد خرید اضافه شد!`)
    };
    
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
                        {formatPrice(displayPrice)} تومان
                    </p>

                    {oldPrice && (
                        <p className={styles.oldPrice}>
                            {formatPrice(oldPrice)} تومان
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                >
                    اضافه کردن به سبد
                </button>
            </div>
        </div>
    );
}
