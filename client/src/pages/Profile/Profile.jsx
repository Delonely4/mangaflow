import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";
import AvatarUpload from "@/components/user/AvatarUpload/AvatarUpload";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    console.log("Profile useEffect: user changed");
  }, [user]);

  const handleAvatarSuccess = (updatedUser) => {
    updateUser(updatedUser);
  };

  if (!user) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Your Profile</h1>

      <div className={styles.card}>
        <div className={styles.avatarSection}>
          <AvatarUpload
            currentAvatar={user.avatar}
            onUploadSuccess={handleAvatarSuccess}
          />
          <p className={styles.roleLabel}>Reader</p>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoGroup}>
            <label>Username</label>
            <div className={styles.value}>{user.username}</div>
          </div>
          <div className={styles.infoGroup}>
            <label>Email</label>
            <div className={styles.value}>{user.email}</div>
          </div>
          <div className={styles.infoGroup}>
            <label>Joined</label>
            <div className={styles.value}>
              {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
