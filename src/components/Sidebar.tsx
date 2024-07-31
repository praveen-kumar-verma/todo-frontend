import React from "react";
import styles from "../styles/Sidebar.module.css";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";

type SidebarProps = {
  userDetail: any;
  onCreateTask: () => void;  // Define the onCreateTask prop
};

const Sidebar: React.FC<SidebarProps> = ({ userDetail, onCreateTask }) => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div>
          <Image
            className={styles.profileImage}
            src="/dummyProfile.jpeg"
            alt="Show password"
            width={31}
            height={31}
          />
        </div>
        <h2>{userDetail?.username}</h2>
      </div>

      <div className={styles.notificationBar}>
        <div className={styles.icons}>
          <Image
            src="/notifications.png"
            alt="Show password"
            width={24}
            height={24}
          />
          <Image
            src="/processing.png"
            alt="Show password"
            width={24}
            height={24}
          />
          <Image
            src="/hideSidebar.png"
            alt="Show password"
            width={24}
            height={24}
          />
        </div>
        <button onClick={logout}>Logout</button>
      </div>

      <div className={styles.navigationLinks}>
        <div className={styles.selected}>
        <Image
            src="/home.png"
            alt="home"
            width={24}
            height={24}
          />
          <h2 >Home</h2>
        </div>
        <div>
        <Image
            src="/boards.png"
            alt="boards"
            width={24}
            height={24}
          />
          <h2 >Boards</h2>
        </div>
        <div>
        <Image
            src="/settings.png"
            alt="settings"
            width={24}
            height={24}
          />
          <h2 >Settings</h2>
        </div>
        <div>
        <Image
            src="/teams.png"
            alt="teams"
            width={24}
            height={24}
          />
          <h2 >Teams</h2>
        </div>
        <div>
        <Image
            src="/analytics.png"
            alt="analytics"
            width={24}
            height={24}
          />
          <h2 >Analytics</h2>
        </div>
      </div>

      <div className={styles.createButton}>
        <button onClick={onCreateTask}>
          Create new task
          <span>
            <Image
              src="/addTask.png"
              alt="Create task"
              width={24}
              height={24}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
