
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/CreateTaskSidebar.module.css";
import axios from "axios";

interface CreateTaskSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStatus: string | null;
  onTaskCreated: () => void;  // Add this line
}


const CreateTaskSidebar: React.FC<CreateTaskSidebarProps> = ({ isOpen, onClose, selectedStatus, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Initialize status with selectedStatus if provided
    if (selectedStatus) {
      setStatus(selectedStatus);
    }
  }, [selectedStatus]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      // Prepare the data to be sent
      const taskData = {
        title,
        description,
        priority,
        deadline,
        status: selectedStatus || ''
      };
  
      // Make the API request
      await axios.post('https://todo-6y7s.onrender.com/task', taskData);
  
      // Notify the parent component to refresh tasks
      onTaskCreated();
  
      // Close sidebar after submission
      onClose();
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.actionBar} onClick={onClose}>        
        <Image src="/cross.png" alt="close" width={24} height={24} />
      </div>

      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="underreview">Under Review</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskSidebar;


