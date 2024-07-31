import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import CreateTaskSidebar from "../components/CreateTaskSidebar";
import styles from "../styles/Dashboard.module.css";
import { getToken } from "@/utils/token";
import Image from "next/image";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  user: string;
}

interface UserDetail {
  username: string;
}

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchUserDetailAndTasks = async () => {
      try {
        const [userResponse, taskResponse] = await Promise.all([
          axios.get("https://todo-6y7s.onrender.com/user-detail"),
          axios.get("https://todo-6y7s.onrender.com/task"),
        ]);
        setUserDetail(userResponse.data.userDetail);
        setTasks(taskResponse.data);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetailAndTasks();
  }, [router]);

  const refreshTasks = async () => {
    try {
      const response = await axios.get("https://todo-6y7s.onrender.com/task");
      setTasks(response.data);
    } catch (error) {
    }
  };
  

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);

    try {
      await axios.put(`https://todo-6y7s.onrender.com/task/${movedTask._id}`, {
        status: movedTask.status,
      });
    } catch (error) {
      const rollbackTasks = Array.from(tasks);
      rollbackTasks.splice(
        source.index,
        0,
        rollbackTasks.splice(destination.index, 1)[0]
      );
      setTasks(rollbackTasks);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  const isUserDetail = (detail: any): detail is UserDetail => {
    return (
      detail !== null &&
      detail !== undefined &&
      typeof detail.username === "string"
    );
  };

  const statusTitles: { [key: string]: string } = {
    todo: "To do",
    inprogress: "In progress",
    underreview: "Under review",
    finished: "Finished",
  };


  const handleCreateTaskToggle = (status?: string | null) => {
    if (status) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus(null);
    }
    setCreateTaskOpen(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* <Sidebar userDetail={userDetail} /> */}
      <Sidebar userDetail={userDetail} onCreateTask={() => handleCreateTaskToggle()} />

      <div className={styles.topContainer}>
        <div>
          {isUserDetail(userDetail) ? (
            <h1>Good morning, {userDetail.username} !</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div>
          <p>
            Help & feedback{" "}
            <Image src="/introduction.png" alt="teams" width={24} height={24} />{" "}
          </p>
        </div>
      </div>

      <div className={styles.notes}>
        <div className={styles.noteContent}>
          <div className={styles.imgDiv}>
            <Image src="/introduction.png" alt="teams" width={77} height={61} />{" "}
          </div>
          <div className={styles.text}>
            <p className={styles.noteTitle}>Introduction tags</p>
            <p className={styles.noteDescription}>
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className={styles.noteContent}>
          <div className={styles.imgDiv}>
            <Image src="/share.png" alt="teams" width={76} height={50} />{" "}
          </div>

          <div className={styles.text}>
            <p className={styles.noteTitle}>Share Notes Instantly</p>
            <p className={styles.noteDescription}>
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </p>
          </div>
        </div>
        <div className={styles.noteContent}>
          <div className={styles.imgDiv}>
            <Image src="/access.png" alt="teams" width={76} height={70} />{" "}
          </div>
          <div className={styles.text}>
            <p className={styles.noteTitle}>Access Anywhere</p>
            <p className={styles.noteDescription}>
              Sync your notes across all devices. Stay productive whether you're
              on your phone, tablet, or computer.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.actionBar}>
        <div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
            />
            <button className={styles.searchButton}>
              <Image
                src="/search.png"
                alt="Search Icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        <div>
          <div className={styles.rightContent}>
            <p>
              Calender view{" "}
              <span>
                <Image
                  src="/calender.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </span>
            </p>

            <p>
              Automation{" "}
              <span>
                <Image
                  src="/automation.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </span>
            </p>

            <p>
              Filter
              <span>
                <Image
                  src="/filter.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </span>
            </p>

            <p>
              Share
              <span>
                <Image
                  src="/share2.png"
                  alt="Search Icon"
                  width={24}
                  height={24}
                />
              </span>
            </p>

            <div className={styles.createButton}>
              <button onClick={() => handleCreateTaskToggle()}>
                Create new task{" "}
                <span>
                  {" "}
                  <Image
                    src="/addTask.png"
                    alt="analytics"
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.notes}>{/* Your notes content */}</div>

      <div className={styles.actionBar}>{/* Your action bar content */}</div>

      <div className={styles.taskDiv}>
        <div className={styles.mainContent}>
          <DragDropContext onDragEnd={onDragEnd}>
            {["todo", "inprogress", "underreview", "finished"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    className={styles.column}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className={styles.taskTypeTitle}>
                      <h2 className={styles.taskType}>
                        {statusTitles[status]}
                      </h2>
                      <Image
                        src="/sort.png"
                        alt="sort"
                        width={20}
                        height={20}
                      />
                    </div>
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={styles.taskCard}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <h3>{task.title}</h3>
                            <p className={styles.description}>
                              {task.description}
                            </p>
                            <p
                              className={`${styles.priority} ${
                                styles[
                                  `priority${
                                    task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)
                                  }`
                                ]
                              }`}
                            >
                              {task.priority}
                            </p>
                            <p className={styles.deadline}>
                              <span>
                                <Image
                                  src="/clock.png"
                                  alt="clock"
                                  width={24}
                                  height={24}
                                />
                              </span>
                              {
                                new Date(task.deadline)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <div className={styles.addTaskButton}>
                      <button className={styles.addTaskColumn} onClick={() => handleCreateTaskToggle(status)}>
                        Add New <span> <Image
                                  src="/add.png"
                                  alt="clock"
                                  width={24}
                                  height={24}
                                /></span>
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>

     <CreateTaskSidebar
  isOpen={isCreateTaskOpen}
  onClose={() => setCreateTaskOpen(false)}
  selectedStatus={selectedStatus}
  onTaskCreated={refreshTasks}
/>

    </div>
  );
};

export default DashboardPage;





