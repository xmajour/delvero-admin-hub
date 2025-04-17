
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Layout
import { MainLayout } from "@/components/layouts/main-layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Riders from "./pages/Riders";
import Merchants from "./pages/Merchants";
import Orders from "./pages/Orders";
import Pricing from "./pages/Pricing";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Support from "./pages/Support";
import Offers from "./pages/Offers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/riders" element={<Riders />} />
              <Route path="/merchants" element={<Merchants />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/support" element={<Support />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
