'use client';

import { useEffect, useState } from "react";
import { products } from "@/data/product";
import { useParams } from "next/navigation";
import ProductDescription from "./product-description";
import ProductImages from "./product-image";
import ProductInfo from "./product-info";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    if (!product) return notFound();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const selectedVariant = product.variants.find(
        (v) => v.size === selectedSize && v.color === selectedColor
    );

    const mainImage =
        selectedVariant?.image || product.variants[0]?.image;

    useEffect(() => {
        if (product.variants.length) {
            setSelectedSize(product.variants[0].size);
            setSelectedColor(product.variants[0].color);
        }
    }, [product]);


    return (
        <>
            <section className={styles.section}>
                <ProductImages
                    name={product.name}
                    mainImage={mainImage}
                    variants={product.variants}
                />

                <ProductInfo
                    product={product}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedVariant={selectedVariant}
                />
            </section>

            <section className={styles.descSection}>
                <ProductDescription product={product} />
            </section>
        </>
    );
}
