// Dashboard.js (adding mobile toggle)
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace ";
import Header from "./components/Header";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
console.log(isSidebarOpen);

  return (
    <div className="h-screen w-full bg-background">
        <Header setIsSidebarOpen={setIsSidebarOpen}/>
       {/* Sidebar for Desktop (md and up) */}
      <div className="hidden md:flex w-64 bg-gray-100 shadow-md fixed inset-0 h-full z-50">
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>

      {/* Sidebar for Mobile (below md) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex w-64 bg-white shadow-md h-full ">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
