"use client";

import React from "react";
import ProductCard from "./product-card";
import styles from "./ProductList.module.css";

export default function ProductList({ products }) {

    return (
        <div className={styles.wrapper}>
            {products.length === 0 && (
                <p className={styles.empty}>هیچ محصولی یافت نشد</p>
            )}

            {products.length > 0 && (
                <div className={styles.grid}>
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
