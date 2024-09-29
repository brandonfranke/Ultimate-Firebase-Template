import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@utils/other";

export default function SideBar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      {/* Upper Sidebar */}
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to=""
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard",
                },
              )}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to=""
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard/orders",
                },
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to=""
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard/products",
                },
              )}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to=""
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard/customers",
                },
              )}
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to=""
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard/analytics",
                },
              )}
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>
      </nav>
      {/* Lower Sidebar */}
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="settings"
              className={cn(
                "flex h-9 w-9 items-center justify-center text-muted-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    location.pathname === "/dashboard/settings",
                },
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
