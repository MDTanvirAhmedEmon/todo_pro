import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/features/auth/authSlice";
import PrivateRoute from "../routes/PrivateRoute";

const ProtectedPage = () => <div>Protected Content</div>;
const LoginPage = () => <div>Login Page</div>;

describe("PrivateRoute", () => {
  it("redirects to login if user is not authenticated", () => {
    const store = configureStore({
      reducer: { logInUser: authReducer },
      preloadedState: { logInUser: { user: null, accessToken: null } },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ProtectedPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    // Navigate to the protected route
    window.history.pushState({}, "", "/");

    // Expect to see login page instead of protected content
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument();
  });
});
