import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "../theme-toggle";
import { Menu, X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <SidebarNav collapsed={!sidebarOpen} setCollapsed={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center px-6 border-b sticky top-0 z-30 bg-background">
          {/* Mobile/desktop toggle button */}
          <button
            type="button"
            className="lg:hidden mr-4 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="hidden lg:block mr-4 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="ml-auto flex items-center space-x-4">
            <NotificationsDropdown />
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">View Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>No new notifications</DropdownMenuItem>
        {/* You can expand this later with actual notification logic */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
