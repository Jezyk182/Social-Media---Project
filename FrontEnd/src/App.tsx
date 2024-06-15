import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddPost from "./components/AddPost/AddPost";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="*" element={<h1>ERROR 404</h1>} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
