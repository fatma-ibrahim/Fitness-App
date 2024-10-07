import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import TargetWeight from "./components/pages/TargetWeight";
import GoalsPage from "./components/pages/GoalsPage";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen app">
          <Navbar />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="context flex-grow p-8">
              <Routes>
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/target-weight" element={<TargetWeight />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;