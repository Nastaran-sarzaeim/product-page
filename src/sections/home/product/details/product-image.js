import { useState } from "react";
import Image from "next/image";
import styles from "./ProductImages.module.css";

export default function ProductImages({ name, variants }) {
  const [mainImage, setMainImage] = useState(
    variants[0]?.image)

  const uniqueImages = [...new Set(variants.map(v => v.image))];

  return (
    <div>
      <div className={styles.mainBox}>
        <Image
          src={mainImage}
          alt={name}
          width={600}
          height={600}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbRow}>
        {uniqueImages.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt=""
            width={100}
            height={100}
            className={`${styles.thumb} ${img === mainImage ? styles.thumbActive : ""
              }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
