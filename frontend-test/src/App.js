import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      {!user ? (
        <AuthPage onLoginSuccess={setUser} />
      ) : (
        <>
          <ProfilePage user={user} />
          <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>🛍️ Product & Category Management</h1>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
              <div style={{ flex: 2 }}>
                <ProductList />
              </div>
              <div style={{ flex: 1 }}>
                <ProductForm />
                <CategoryForm />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}  
export default App;