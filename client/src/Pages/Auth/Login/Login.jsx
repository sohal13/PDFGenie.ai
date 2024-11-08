import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "../../components/Logo";
import apiClient from "@/apiClient";
import { toast } from "react-toastify";
import useUserStore from "@/store/useUserStore";
import Cookies from "js-cookie";

function Login() {

    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in both fields.");
            return;
        }
        setLoading(true)
        try {
            const response = await apiClient.post("/manualauth/login", {
                email,
                password,
            });
            const data = response.data;
            console.log(data);

            if (data.success === true) {
                setLoading(false);
                // Handle successful registration (e.g., redirect or show a success message)
                toast.success("Login successful");
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 90);
                Cookies.set('pdfgenieai_token', data.token, { expires: expirationDate });
                setUser(data.user);
                localStorage.setItem('pdfgenieai_user', JSON.stringify(data.user));
                navigate("/")
            } else {
                setLoading(false);
                toast.error(data.message || "Registration failed!");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response.data.error);
        }
    };

    const googleAuth = async () => {
        try {
            // Open the Google authentication window
            window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
        } catch (error) {
            console.log(error);
            toast.error("Google login failed, please try again.");
        }
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
                <Button variant="outline" onClick={googleAuth}>
                    Sign in With <span className="rounded-full bg-white"><FcGoogle /> </span>
                </Button>
                <Button disabled={loading} onClick={handleLogin}>
                    {loading ? "Loging..." : "LogIn"}
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
