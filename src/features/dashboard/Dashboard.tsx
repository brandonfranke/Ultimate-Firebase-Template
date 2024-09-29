import { TooltipProvider } from "@components/ui/tooltip";
import { Outlet } from "react-router-dom";
import NavBar from "@features/dashboard/navbar/NavBar";
import SideBar from "@features/dashboard/sidebar/SideBar";

export default function Dashboard() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {/* Sidebar */}
        <SideBar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* Top Navbar */}
          <NavBar />
          {/* Main Content */}
          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  );
}
