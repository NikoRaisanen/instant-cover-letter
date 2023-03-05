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

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={ <Navigate replace to="/get-started" />}/>
          <Route path="/get-started" element={<SplashPage/>} />
          <Route path="/generate" element={<GeneratePage/>} />
          <Route path="/result" element={<ResultPage/>} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
