import styles from "./ProductDescription.module.css";

export default function ProductDescription({ product }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>توضیحات</h3>

      <p className={styles.text}>
        {product.description}
      </p>

      <div className={styles.metaBox}>
        <p>
          <span className={styles.bold}>دسته‌بندی:</span>{" "}
          {product.category}
        </p>
      </div>
    </div>
  );
}
