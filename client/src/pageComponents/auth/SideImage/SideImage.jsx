import maskImage from "@/assets/mask.jpeg";
import styles from "./SideImage.module.scss";

function SideImage() {
  return (
    <div className={styles.sideImage}>
      <img src={maskImage} alt="mask" className={styles.sideImage__image} />
      <div className={styles.sideImage__overlay}></div>
    </div>
  );
}

export default SideImage;
