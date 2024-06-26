import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContainer from "./containers/app.container";
import LoginContainer from "./containers/login.container";
import NotFoundContainer from "./containers/not-found.container";
import RegisterContainer from "./containers/register.container";
import { ServiceProvider } from "./context/service.context";
import { UserProvider } from "./context/user.context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="flex bg-white w-screen h-screen">
    <ChakraProvider>
      <UserProvider>
        <ServiceProvider>
          <BrowserRouter>
            <Routes>
              <Route path="app" element={<AppContainer />} />
              <Route path="auth/login" element={<LoginContainer />} />
              <Route path="auth/register" element={<RegisterContainer />} />
              <Route path="*" element={<NotFoundContainer />} />
            </Routes>
          </BrowserRouter>
        </ServiceProvider>
      </UserProvider>
    </ChakraProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
