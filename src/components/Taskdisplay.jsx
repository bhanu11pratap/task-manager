import React, { useEffect, useState } from "react";
import EditOrDelete from "./EditOrDelete";
import { ChildBox, ParentBox, SectionBox, TaskCard } from "./styled/divs";
import { Label, TaskDate, TaskDescription, TaskStatus } from "./styled/typos";
import TaskForm from "./Taskform";
import { Fade, Modal, Backdrop, Box } from "@mui/material";

const TaskDisplay = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("task"));
    const updatedTasks = tasks.map((task) => {
      if (task.key === droppedTask.key) {
        return {
          ...task,
          taskStatus: status,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addNewTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    
    const updatedTasks = tasks.map((task) =>
      task.key === updatedTask.key ? updatedTask : task
    );
    setTasks(updatedTasks);
    setOpenModal(false);
  };

  const handleTaskDelete = (key) => {
    const updatedTasks = tasks.filter((task) => task.key !== key);
    setTasks(updatedTasks);
    setOpenModal(false);
    localStorage.setItem("TASK_LIST", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    try {
      const tasksList = JSON.parse(localStorage.getItem("TASK_LIST")) || [];
      setTasks(tasksList);
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem("TASK_LIST", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <TaskForm addNewTask={addNewTask} />
      <ParentBox>
        <ChildBox
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, "To-Do")}
        >
          <Label variant="h6">To-Do</Label>
          <SectionBox>
            {tasks &&
              tasks.length > 0 &&
              tasks
                .filter((task) => task.taskStatus === "To-Do")
                .map((task) => (
                  <TaskCard
                    key={task.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => handleTaskClick(task)}
                  >
                    <TaskDescription variant="body1">
                      {task.taskDescription}
                    </TaskDescription>
                    <TaskDate variant="body2">Date: {task.taskDate}</TaskDate>
                  </TaskCard>
                ))}
          </SectionBox>
        </ChildBox>
        <ChildBox
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, "In-Progress")}
        >
          <Label variant="h6">In-progress</Label>
          <SectionBox>
            {tasks &&
              tasks.length > 0 &&
              tasks
                .filter((task) => task.taskStatus === "In-Progress")
                .map((task) => (
                  <TaskCard
                    key={task.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => handleTaskClick(task)}
                  >
                    <TaskDescription variant="body1">
                      {task.taskDescription}
                    </TaskDescription>
                    <TaskDate variant="body2">Date: {task.taskDate}</TaskDate>
                  </TaskCard>
                ))}
          </SectionBox>
        </ChildBox>
        <ChildBox
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, "Done")}
        >
          <Label variant="h6">Done</Label>
          <SectionBox>
            {tasks &&
              tasks.length > 0 &&
              tasks
                .filter((task) => task.taskStatus === "Done")
                .map((task) => (
                  <TaskCard
                    key={task.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => handleTaskClick(task)}
                  >
                    <TaskDescription variant="body1">
                      {task.taskDescription}
                    </TaskDescription>
                    <TaskDate variant="body2">Date: {task.taskDate}</TaskDate>
                  </TaskCard>
                ))}
          </SectionBox>
        </ChildBox>
      </ParentBox>

      {/* modal to edit or delete a task */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box>
            {selectedTask && (
              <EditOrDelete
                task={selectedTask}
                onUpdate={handleTaskUpdate}
                onDelete={handleTaskDelete}
                onCancel={() => setOpenModal(false)}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TaskDisplay;
