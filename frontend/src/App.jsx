import { Routes,Route} from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import React,{useEffect,useState} from "react"

function App() {

  const [isDarkMode,setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [isDarkMode]);
  return (
    <>
      <div>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
          <Route path="/create" element={<CreatePage  isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
         </Routes>
        
      </div>
    </>
  );
}

export default App;
