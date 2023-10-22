import * as React from "react";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';



import Posts from './components/Posts/Posts';
import HomeScreen from "./pages/HomeScreen";
import BlogScreen from "./pages/BlogScreen";


export function RouteHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="blog" element={<BlogScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}
