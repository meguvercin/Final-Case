"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import SideBar from "@/Components/Global/SideBar/SideBar";
import MainContainer from "@/Components/Global/MainContainer/MainContainer";
import NavBar from "@/Components/Global/NavBar/NavBar";
import store from "@/Redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Akbank Kampanya Öneri Sistemi </title>
      </head>
      <Provider store={store}>
        <body className={inter.className}>
          <NavBar />
          <SideBar />
          <MainContainer>{children}</MainContainer>
        </body>
      </Provider>
    </html>
  );
}
