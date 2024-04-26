import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Cars from "./pages/Cars";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import Rents from "./pages/Rents";
import Settings from "./pages/Settings";
import Coupons from "./pages/Coupons";
import SingleRent from "./pages/SingleRent";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import CarDetails from "./pages/CarDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rents" element={<Rents />} />
            <Route path="rents/:rentId" element={<SingleRent />} />
            <Route path="check-in/:rentId" element={<Checkin />} />
            <Route path="cars" element={<Cars />} />
            <Route path="cars/:carID" element={<CarDetails />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="coupons" element={<Coupons />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--fallback-b1,oklch(var(--b1)/1))",
            color: "var(--fallback-bc,oklch(var(--bc)/1))",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
