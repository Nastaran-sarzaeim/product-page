"use client";
import { useState } from "react";
import Link from "next/link";
import { formatPrice, parsePriceToNumber } from "@/utils/utils";
import styles from "./HoverCart.module.css";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function HoverCart() {
  const { user, removeFromCart } = useUser();
  const cart = user?.cart || [];
  const [open, setOpen] = useState(false);

  const getItemPrice = (item) =>
    item?.price ??
    item?.basePrice ??
    item?.variant?.price ??
    0;

  const total = cart.reduce(
    (sum, item) => sum + parsePriceToNumber(getItemPrice(item)) * (item.qty || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.iconBox}>
        <div className={styles.cart}>
          <Image
            src="/icon/ic_bag.svg"
            alt="bag icon"
            width={24}
            height={24}
          />
        </div>

        {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <h3 className={styles.title}>سبد خرید</h3>

          <div className={styles.list}>
            {cart.length === 0 ? (
              <p className={styles.empty}>سبد خرید خالی است.</p>
            ) : (
              cart.map((item) => {
                const price = getItemPrice(item);
                const lineTotal =
                  parsePriceToNumber(price) * (item.qty || 1);

                const imageSrc =
                  item?.images?.[0] ||
                  item?.image ||
                  "/products/placeholder.jpg";

                return (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className={styles.itemRow}
                  >
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      width={56}
                      height={56}
                      className={styles.itemImage}
                    />

                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>

                      <p className={styles.itemMeta}>
                        {(item.qty || 1)} عدد × {formatPrice(price)}
                      </p>

                      {item.size && (
                        <p className={styles.itemMeta}>
                          سایز: {item.size}
                        </p>
                      )}
                    </div>

                    <div className={styles.itemRight}>
                      <span className={styles.itemPrice}>
                        {formatPrice(lineTotal)}
                      </span>

                      <button
                        className={styles.removeBtn}
                        onClick={() => {
                          removeFromCart(
                            item.id,
                            item.size,
                            item.color
                          );
                        }}
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>جمع کل:</span>
            <span className={styles.totalValue}>
              {formatPrice(total)} تومان
            </span>
          </div>

          <Link href="/checkout">
            <button className={styles.checkoutBtn}>
              مشاهده سبد خرید
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
