// components/Sidebar.js
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

const Sidebar = ({ setIsSidebarOpen }) => {

  return (
    <div className="relative w-full flex flex-col bg-white p-2 h-full shadow-lg">
      
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8">
        <Link to={'/'} className="w-full cursor-pointer"><img src="/logo.png" alt="logo" className="rounded h-10 w-full"/></Link>
        {/*<h1 className="text-2xl font-semibold text-primary">PDFGenie.ai</h1>*/}
      </div>
      
      {/* Upload PDF Button */}
      <Button className="bg-primary text-white mb-4">
        + Upload PDF
      </Button>

      {/* Navigation Links */}
      <nav className="flex flex-col text-text-primary mb-4">
        <Link to={'/workspace'} className="py-2 hover:bg-primary hover:text-white rounded-md flex items-center px-2 gap-2"><MdWork size={25}/> Workspace</Link>
        <Link to={'/payment'} className="py-2 hover:bg-primary hover:text-white rounded-md flex items-center px-2 gap-2"><RiSecurePaymentFill size={25}/> Upgrade</Link>
      </nav>

      {/* Close Button (Centered) */}
      <button 
        onClick={() => setIsSidebarOpen(false)}  // Close sidebar on mobile
        className="absolute bg-white shadow-md rounded-full left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary hover:text-primary-darker focus:outline-none md:hidden"
      >
        <IoIosArrowDropleftCircle className={`text-6xl shadow-md rounded-full md:hidden`}/>
      </button>

      {/* Progress Bar and Text */}
      <div className="mt-auto">
        <Progress value={40} className="mb-2" color="primary" />
        <p className="text-sm text-text-secondary">2 PDFs out of 5 uploaded</p>
      </div>
    </div>
  );
};

export default Sidebar;
