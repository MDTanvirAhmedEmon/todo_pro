// src/__tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";
import { store } from "../redux/store";
import Login from "../pages/auth/login";

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

const mockLogIn = vi.fn(() => ({
    unwrap: () => Promise.resolve({ user: { name: "Test User" }, token: "abc123" }),
}));

vi.mock("../../redux/features/auth/authApi", () => ({
    useLogInMutation: () => [mockLogIn, { isLoading: false }],
}));

const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );

describe("Login Component", () => {
    beforeEach(() => {
        mockLogIn.mockReset();
        vi.clearAllMocks();
    });

    it("renders the login form correctly", () => {
        renderComponent();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("shows validation errors when fields are empty", async () => {
        renderComponent();

        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it("calls logIn when form is valid", async () => {
        renderComponent();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "12345678" } });

        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        await waitFor(() => {
            expect(mockLogIn).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "12345678",
            });
            expect(toast.success).toHaveBeenCalledWith("Log In Successfully");
        });
    });

    it("shows toast error when login fails", async () => {
        // override mock to reject
        mockLogIn.mockImplementationOnce(() => ({
            unwrap: () =>
                Promise.reject({ data: { message: "Invalid credentials" } }),
        }));

        renderComponent();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.input(emailInput, { target: { value: "wrong@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "wrongpass" } });

        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

        // Properly await the async call
        await waitFor(async () => {
            // Wait for the promise rejection to finish
            await Promise.resolve();
            expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
        });
    });
});
