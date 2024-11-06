import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../components/Logo";
import apiClient from "@/apiClient";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in both fields.");
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", {
                email,
                password,
            });
            toast.success("Login successful!");
            // Redirect or handle login success
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const googleAuth = () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self");
    };

    return (
        <Card className="w-[350px] shadow-2xl shadow-primary">
            <CardHeader>
                <CardTitle>
                    Login <span><Logo /></span>
                </CardTitle>
                <CardDescription>Welcome back to PDFGenie.ai 👋</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter Your Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter The Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={googleAuth}>
                    Sign in With <span className="rounded-full bg-white"><FcGoogle /> </span>
                </Button>
                <Button onClick={handleLogin}>
                    LogIn
                </Button>
            </CardFooter>
            <CardFooter>
                <p className="text-sm">
                    New Here? <Link to={'/register'} className="underline text-primary">Register</Link>
                </p>
            </CardFooter>
        </Card>
    );
}

export default Login;
