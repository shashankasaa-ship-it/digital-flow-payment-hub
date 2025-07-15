import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import CorporateOnboarding from "./pages/CorporateOnboarding";
import CorporateList from "./pages/CorporateList";
import Analytics from "./pages/Analytics";
import PaymentSearch from "./pages/PaymentSearch";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import PaymentTracking from "./pages/PaymentTracking";
import HolidayCalendar from "./pages/HolidayCalendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/onboarding" element={<CorporateOnboarding />} />
          <Route path="/corporate-list" element={<CorporateList />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payment-search" element={<PaymentSearch />} />
          <Route path="/subscription-management" element={<SubscriptionManagement />} />
          <Route path="/payment-tracking" element={<PaymentTracking />} />
          <Route path="/holiday-calendar" element={<HolidayCalendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
