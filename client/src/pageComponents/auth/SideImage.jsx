import vagabondImage from "../../../assets/vagmanga.png";
import styles from "./SideImage.module.css";

function SideImage() {
  return (
    <div className={styles.sideImage}>
      <img
        src={vagabondImage}
        alt="Vagabond"
        className={styles.sideImage__image}
      />
      <div className={styles.sideImage__overlay}></div>
    </div>
  );
}

export default SideImage;
