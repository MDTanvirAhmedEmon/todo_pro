// src/__tests__/Register.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import toast from "react-hot-toast";
import { store } from "../redux/store";
import Register from "../pages/auth/register";

// Mock toast
vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock register API
const mockRegisterUser = vi.fn(() => ({
    unwrap: () =>
        Promise.resolve({ user: { name: "Test User" }, token: "abc123" }),
}));

vi.mock("../../redux/features/auth/authApi", () => ({
    useRegisterUserMutation: () => [mockRegisterUser, { isLoading: false }],
}));

const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        </Provider>
    );

describe("Register Component", () => {
    beforeEach(() => {
        mockRegisterUser.mockReset();
        vi.clearAllMocks();
    });

    it("renders the form correctly", async () => {
        renderComponent();

        expect(await screen.findByPlaceholderText(/full name/i)).toBeInTheDocument();
        expect(await screen.findByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(await screen.findByPlaceholderText(/enter your password/i)).toBeInTheDocument();
        expect(await screen.findByPlaceholderText(/confirm your password/i)).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    it("shows validation errors when fields are empty", async () => {
        renderComponent();

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
            expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
        });
    });

    it("shows error when email is invalid", async () => {
        renderComponent();

        const emailInput = await screen.findByPlaceholderText(/email/i);
        fireEvent.input(emailInput, { target: { value: "invalidemail" } });
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(/email must be a valid email/i)).toBeInTheDocument();
        });
    });

    it("shows error when passwords do not match", async () => {
        renderComponent();

        const passwordInput = await screen.findByPlaceholderText(/enter your password/i);
        const confirmInput = await screen.findByPlaceholderText(/confirm your password/i);

        fireEvent.input(passwordInput, { target: { value: "12345678" } });
        fireEvent.input(confirmInput, { target: { value: "1234" } });

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
        });
    });

    it("calls registerUser when form is valid", async () => {
        renderComponent();

        const nameInput = await screen.findByPlaceholderText(/full name/i);
        const emailInput = await screen.findByPlaceholderText(/email/i);
        const passwordInput = await screen.findByPlaceholderText(/enter your password/i);
        const confirmInput = await screen.findByPlaceholderText(/confirm your password/i);

        fireEvent.input(nameInput, { target: { value: "Test User" } });
        fireEvent.input(emailInput, { target: { value: "test@example.com" } });
        fireEvent.input(passwordInput, { target: { value: "12345678" } });
        fireEvent.input(confirmInput, { target: { value: "12345678" } });

        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(async () => {
            expect(mockRegisterUser).toHaveBeenCalledWith({
                name: "Test User",
                email: "test@example.com",
                password: "12345678",
            });
            expect(toast.success).toHaveBeenCalledWith("Log In Successfully");
        });
    });
});
