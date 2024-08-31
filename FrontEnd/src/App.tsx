import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddPost from "./components/AddPost/AddPost";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axiosConfig from "./axiosConfig";

const queryClient = new QueryClient();

const App = () => {

  axiosConfig()


  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/add" element={<AddPost forEdit={ false }/>} />
          <Route path="/edit/:id" element={<AddPost forEdit={ true }/>} />
          <Route path="*" element={<h1>ERROR 404</h1>} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
