"use client";

import { useEffect } from "react";
import styles from "./OptionSelector.module.css";

export default function OptionsSelector({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) {
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  useEffect(() => {
    if (
      selectedSize &&
      selectedColor &&
      !product.variants.some(
        (v) =>
          v.size === selectedSize &&
          v.color === selectedColor &&
          v.stock > 0
      )
    ) {
      const firstValidColor = product.variants.find(
        (v) => v.size === selectedSize && v.stock > 0
      )?.color;

      setSelectedColor(firstValidColor || null);
    }
  }, [selectedSize, selectedColor, product.variants, setSelectedColor]);

  return (
    <div className={styles.wrapper}>
      {/* size */}
      <div>
        <h3 className={styles.label}>سایز</h3>

        <div className={styles.row}>
          {sizes.map((size) => {
            const sizeStock = product.variants.some(
              (v) => v.size === size && v.stock > 0
            );

            return (
              <button
                key={size}
                disabled={!sizeStock}
                onClick={() => sizeStock && setSelectedSize(size)}
                className={`
                  ${styles.sizeBtn}
                  ${selectedSize === size ? styles.sizeActive : ""}
                  ${!sizeStock ? styles.sizeDisabled : ""}
                `}
              >
                {sizeStock ? size : `${size} ناموجود`}
              </button>
            );
          })}
        </div>
      </div>

      {/* color */}
      <div>
        <h3 className={styles.label}>رنگ</h3>

        <div className={styles.row}>
          {colors.map((color) => {
            const colorStock =
              selectedSize &&
              product.variants.some(
                (v) =>
                  v.size === selectedSize &&
                  v.color === color &&
                  v.stock > 0
              );

            return (
              <div
                key={color}
                onClick={() => colorStock && setSelectedColor(color)}
                className={`
                  ${styles.colorDot}
                  ${selectedColor === color ? styles.colorActive : ""}
                  ${!colorStock ? styles.colorDisabled : ""}
                `}
                style={{ backgroundColor: color }}
              >
                {!colorStock && <span className={styles.colorX}>✕</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
