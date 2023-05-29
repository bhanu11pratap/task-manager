import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/Taskform";
import Taskdisplay from "./components/Taskdisplay";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Sidebar>
        <Taskdisplay />
      </Sidebar>
    </LocalizationProvider>
  );
}

export default App;
