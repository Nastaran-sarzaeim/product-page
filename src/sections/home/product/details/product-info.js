"use client";

import { formatPrice } from "@/utils/utils";
import { useEffect } from "react";
import OptionsSelector from "./options-selector";
import styles from "./ProductInfo.module.css";
import { useUser } from "@/context/UserContext";

export default function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  selectedVariant,
}) {
  const { user, updateCart, removeFromCart } = useUser();

  const existingItem = user?.cart?.find(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const quantity = existingItem?.qty || 0;

  const handleAdd = () => {
    if (!user) {
      alert("لطفاً ابتدا وارد حساب خود شوید");
      return;
    }

    if (!selectedSize || !selectedColor) {
      alert("لطفاً سایز و رنگ را انتخاب کنید");
      return;
    }

    const newCart = existingItem
      ? user.cart.map((item) =>
        item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
          ? { ...item, qty: item.qty + 1 }
          : item
      )
      : [
        ...(user.cart || []),
        {
          ...product,
          qty: 1,
          size: selectedSize,
          color: selectedColor,
        },
      ];

    updateCart(newCart);
  };

  const handleRemove = () => {
    if (!user) return;

    if (!existingItem) return;

    if (existingItem.qty > 1) {
      const newCart = user.cart.map((item) =>
        item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      updateCart(newCart);
    } else {
      removeFromCart(product.id, selectedSize, selectedColor);
    }
  };

  useEffect(() => {
    setSelectedColor(null);
  }, [selectedSize, setSelectedColor]);

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.basePrice;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{product.name}</h1>

      <p className={styles.price}>
        {formatPrice(displayPrice)}
      </p>

      {selectedVariant && product.basePrice > selectedVariant.price && (
        <p className={styles.oldPrice}>
          {formatPrice(product.basePrice)}
        </p>
      )}

      <p className={styles.desc}>{product.description}</p>

      <OptionsSelector
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <div className={styles.cartRow}>
        {quantity > 0 ? (
          <>
            <button
              onClick={handleRemove}
              className={`${styles.btnCircle} ${styles.btnMinus}`}
            >
              {quantity === 1 ? "حذف" : "-"}
            </button>

            <span className={styles.qty}>{quantity}</span>

            <button
              onClick={handleAdd}
              className={`${styles.btnCircle} ${styles.btnPlus}`}
            >
              +
            </button>
          </>
        ) : (
          <button
            onClick={handleAdd}
            className={styles.btnAdd}
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
}
