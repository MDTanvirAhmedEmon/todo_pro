import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../zod/schema";
import { useLogInMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logIn, { isLoading }] = useLogInMutation();

    const onSubmit = async (data: LoginFormData) => {
        logIn({ email: data.email, password: data.password })
            .unwrap()
            .then((data) => {
                dispatch(setUser({ user: data?.user, accessToken: data?.token }));
                toast.success("Log In Successfully");
                navigate(`/app/todos`);
            })
            .catch((error) => {
                toast.error(error?.data?.message);
            });
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-[500px] px-8 py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                    Sign In
                </h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
                    Enter your email and password to continue
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 cursor-pointer bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                    >
                        {isLoading ? "Loading..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don’t have an account?{" "}
                        <Link to="/register">
                            <button className="text-purple-600 hover:underline font-medium cursor-pointer">
                                Sign up
                            </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;