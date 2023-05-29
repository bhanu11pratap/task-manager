import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const TaskForm = (props) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDate, setTaskDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const key = uuid();
    const newTask = {
      key,
      taskDescription,
      taskStatus,
      taskDate: format(taskDate, "dd/MM/yyyy"),
    };
    props.addNewTask(newTask);

    // Reset form fields
    setTaskDescription("");
    setTaskStatus("");
    setTaskDate(null);
    setOpenModal(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: 1 }}>
        + Create Task
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <form onSubmit={handleTaskSubmit}>
              <TextField
                label="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                fullWidth
                required
                sx={{ py: 2 }}
              />
              <FormControl
                sx={{ padding: "0,2,0,0" }}
                component="fieldset"
                fullWidth
              >
                <FormLabel component="legend">Task Status</FormLabel>
                <RadioGroup
                  sx={{ paddingTop: 0 }}
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="To-Do"
                    control={<Radio />}
                    label="To-Do"
                  />
                  <FormControlLabel
                    value="In-Progress"
                    control={<Radio />}
                    label="In-Progress"
                  />
                  <FormControlLabel
                    value="Done"
                    control={<Radio />}
                    label="Task Done"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ py: 2 }} component="fieldset" fullWidth>
                <DatePicker
                  label="Task Date"
                  textField={(params) => <TextField {...params} />}
                  value={taskDate}
                  format="dd/MM/yyyy"
                  onChange={(date) => setTaskDate(date)}
                />
              </FormControl>

              <div style={{ marginTop: "auto" }}>
                <Button
                  sx={{ py: 2, height: 2, marginLeft: "auto" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TaskForm;
