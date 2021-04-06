import { Toast } from "./Components";
// import axios from "axios";
import { useData } from "./Context";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { RouterComponent } from "./Routes";

function App() {
  const { toast } = useData();

  return (
    <div>
      <Navbar />
      <RouterComponent />
      {toast ? <Toast /> : <></>}
    </div>
  );
}

export default App;
