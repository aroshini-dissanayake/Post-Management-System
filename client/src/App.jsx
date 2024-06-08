import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SpecificPostDetails from "./component/Posts/SpecificPostDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/getpost/:postId" element={<SpecificPostDetails />} />
    </Routes>
  );
}

export default App;
