import { useState, useRef } from "react";
import { uploadAvatar } from "../../../api/userApi";
import styles from "./AvatarUpload.module.scss";

const AvatarUpload = ({ currentAvatar, onUploadSuccess }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large! Max 5MB.");
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only PNG and JPEG images are allowed!");
      return;
    }

    setUploading(true);

    const result = await uploadAvatar(file);

    console.log("Upload result: ", result);

    if (!result.success) {
      console.error("Upload failed", result.error);
      alert(result.error);
      setUploading(false);
      return;
    }

    console.log("New user's data: ", result.data.user);

    if (onUploadSuccess) {
      onUploadSuccess(result.data.user);
    }

    setUploading(false);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={styles.avatarWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png,image/jpeg,image/jpg"
        className={styles.hiddenInput}
      />

      <img
        src={currentAvatar || "/default-avatar.png"}
        alt="User Avatar"
        className={styles.avatarImage}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/150/cccccc/666666?text=Avatar";
        }}
      />

      {(isHovered || uploading) && (
        <div className={styles.overlay}>
          {uploading ? (
            <div className={styles.loader}></div>
          ) : (
            <span className={styles.uploadText}>CHANGE</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
