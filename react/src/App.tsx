import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import GeneratePage from "./components/GeneratePage";
import ResultPage from "./components/ResultPage";
import SplashPage from "./components/SplashPage";
import PdfUpload from "./components/PdfUpload";
import PromptSelect from "./components/PromptSelect";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/get-started" element={<SplashPage/>} />
          <Route path="/your-skills" element={<PromptSelect/>} />
          <Route path="/generate" element={<GeneratePage/>} />
          <Route path="/result" element={<ResultPage/>} />
          <Route path="/pdf" element={<PdfUpload/>} />
          <Route path="*" element={ <Navigate replace to="/get-started" />}/>
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
