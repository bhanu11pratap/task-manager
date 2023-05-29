import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

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
};

const EditOrDelete = ({ task, onUpdate, onDelete }) => {
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);
  const [taskStatus, setTaskStatus] = useState(task.taskStatus);
  const [taskDate, setTaskDate] = useState(
    parse(task.taskDate, "dd/MM/yyyy", new Date())
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      key: task.key,
      taskDescription,
      taskStatus,
      taskDate: format(taskDate, "dd/MM/yyyy"),
    };
    onUpdate(updatedTask);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(task.key);
  };

  return (
    <>
      <Box sx={style}>
        <form>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ py: 2, height: 2 }}
              type="submit"
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              sx={{ py: 2, height: 2 }}
              type="submit"
              variant="contained"
              color="info"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EditOrDelete;
