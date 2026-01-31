import { products } from "@/data/product";
import ProductList from "@/sections/home/product/product-list";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>
        محصولات
      </h1>
      <ProductList products={products} />
    </div>
  );
}
