import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";

import CreateProductForm from "./pages/admin/CreateProductForm";
import AdminProductList from "./pages/admin/ProductList";
import ToDoList from "./pages/admin/ToDoList";

import LoginAndRegisterForm from "./pages/LoginAndRegister";
import ProductList from "./pages/user/ProductList";
import ProductDetail from "./pages/user/ProductDetail";
import Survey from "./pages/user/Survey";

import PublishLayout from "./layouts/PublishLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import LoginLayout from "./layouts/LoginLayout";

import { ROUTERS } from "./constants/routers";

import { lightTheme, darkTheme } from "./constants/themes";

export const ThemeContext = createContext();
export const UserContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const [nameValue, setNameValue] = useState("");

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "iPhone 12",
      price: 15000000,
      isNew: true,
    },
    {
      id: 2,
      name: "iPhone 12 Mini",
      price: 12000000,
      isNew: false,
    },
    {
      id: 3,
      name: "iPhone 12 Pro",
      price: 20000000,
      isNew: true,
    },
    {
      id: 4,
      name: "iPhone 12 Pro Max",
      price: 22000000,
      isNew: false,
    },
    {
      id: 5,
      name: "iPhone 13",
      price: 25000000,
      isNew: false,
    },
    {
      id: 6,
      name: "iPhone 13 Mini",
      price: 20000000,
      isNew: false,
    },
    {
      id: 7,
      name: "Galaxy S21",
      price: 15000000,
      isNew: false,
    },
    {
      id: 8,
      name: "Galaxy Note 20",
      price: 20000000,
      isNew: false,
    },
    {
      id: 9,
      name: "Xiaomi M11",
      price: 15000000,
      isNew: false,
    },
    {
      id: 10,
      name: "Oppo Reno 5",
      price: 18000000,
      isNew: false,
    },
  ]);

  const handleAddProduct = (values) => {
    setProductList([...productList, values]);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        <UserContext.Provider
          value={{
            userInfo,
            setUserInfo,
          }}
        >
          <Routes>
            <Route
              path={ROUTERS.USER.HOME}
              element={
                <PublishLayout>
                  <div>Home</div>
                </PublishLayout>
              }
            />
            <Route
              path={ROUTERS.LOGIN}
              element={
                <LoginLayout>
                  <LoginAndRegisterForm setUserInfo={setUserInfo} />
                </LoginLayout>
              }
            />
            <Route
              path={ROUTERS.USER.PRODUCTS}
              element={
                <PublishLayout>
                  <ProductList productList={productList} />
                </PublishLayout>
              }
            />
            <Route
              path={ROUTERS.USER.PRODUCT_DETAIL}
              element={
                <PublishLayout>
                  <ProductDetail productList={productList} />
                </PublishLayout>
              }
            />
            <Route
              path={ROUTERS.USER.SURVEY}
              element={
                <PublishLayout>
                  <Survey />
                </PublishLayout>
              }
            />

            <Route
              path={ROUTERS.ADMIN.PRODUCTS}
              element={
                <PrivateLayout>
                  <AdminProductList productList={productList} />
                </PrivateLayout>
              }
            />
            <Route
              path={ROUTERS.ADMIN.CREATE_PRODUCT}
              element={
                <PrivateLayout>
                  <CreateProductForm
                    userInfo={userInfo}
                    nameValue={nameValue}
                    setNameValue={setNameValue}
                    handleAddProduct={handleAddProduct}
                  />
                </PrivateLayout>
              }
            />
            <Route
              path={ROUTERS.ADMIN.TODO_LIST}
              element={
                <PrivateLayout>
                  <ToDoList />
                </PrivateLayout>
              }
            />
          </Routes>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
