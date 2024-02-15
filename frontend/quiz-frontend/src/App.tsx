import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AuthPages from "./pages/auth/AuthPages";
import type { RootState } from "./store/store";
import AppRoutes from "./components/AppRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/sidebar/Sidebar";
import LoaderModel from "./components/modal/LoaderModel";
import ConnectionErrorModal from "./components/modal/ConnectionErrorModal";

function App() {
  const [isSideBarVisibe, setIsSideBarVisibe] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const token = useSelector((state: RootState) => state.token.token);

  if (isSideBarVisibe) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return (
    <>
      {!token ? (
        <AuthPages setIsConnectionError={setIsConnectionError} />
      ) : (
        <BrowserRouter>
          <div className="bg-[#FEF9C3]">
            <Header
              isMobileView={isMobileView}
              setIsMobileView={setIsMobileView}
              setIsSideBarVisibe={setIsSideBarVisibe}
              isSideBarVisibe={isSideBarVisibe}
            />
            <main
              className="font-[karla] relative"
              onClick={() => setIsMobileView(false)}
            >
              <AppRoutes setPublishing={setPublishing} setIsConnectionError={setIsConnectionError}/>

              {isSideBarVisibe && (
                <div
                  className="fixed top-0 left-0 w-full h-[100vh] z-10 bg-[#00000033]"
                  onClick={() => setIsSideBarVisibe(false)}
                />
              )}

              {isSideBarVisibe && (
                <Sidebar
                  setIsSideBarVisibe={setIsSideBarVisibe}
                  isSideBarVisibe={isSideBarVisibe}
                  setLoggingOut={setLoggingOut}
                  setIsConnectionError={setIsConnectionError}
                />
              )}
              {loggingOut && <LoaderModel text="Logging out" />}
              {publishing && <LoaderModel text="Publishing" />}
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )}
      {isConnectionError && (
        <ConnectionErrorModal setIsConnectionError={setIsConnectionError} />
      )}
    </>
  );
}

export default App;
