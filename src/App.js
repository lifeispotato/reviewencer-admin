import "./App.css";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import AdminRouter from "./AdminRouter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <AdminRouter />
      <ToastContainer
        className="toast"
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
