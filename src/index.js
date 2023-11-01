import React from "react";
import "./index.css";
import StartPage from "./components/StartPage/StartPage";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
const router = createBrowserRouter([
  //시작페이지
  {
    path: "/",
    element: <StartPage />,
  },
  //질문페이지
  {
    path: "/question",
    element: <QuestionPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
