import React, { useEffect } from "react";
import "./styles/reset.css";
import "./styles/index.css";
import HeaderSection from "./Components/HeaderSection";
import MainSection from "./Components/MainSection";
import useStore from "./store";

function App() {
  const getUserList = useStore((state) => state.getUserList);
  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <div id="root">
      <header className="main-header">
        <HeaderSection />
      </header>
      <main className="wrapper">
        <MainSection />
      </main>
    </div>
  );
}

export default App;
