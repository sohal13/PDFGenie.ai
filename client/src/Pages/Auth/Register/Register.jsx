import { useState } from "react"; // Import useState for managing state
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
import apiClient from "@/apiClient"; // Import your API client
import { toast } from 'react-toastify';

function Register() {
    // State to hold form values and errors
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    console.log(formData);
    
    const [error, setError] = useState("");
console.log(error);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle Google authentication
    const googleAuth = () => {
        window.open(`${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      console.log("clicked");
      
        e.preventDefault(); // Prevent default form submission behavior

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
           toast.error("Passwords do not match!");
            return;
        }
        try {
            // Send the registration data to the backend
            const response = await apiClient.post("/api/v1/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                // Handle successful registration (e.g., redirect or show a success message)
                console.log("Registration successful:", response.data.message);
            } else {
                setError(response.data.message || "Registration failed!");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError("An error occurred during registration. Please try again.");
        }
    };

    return (
        <Card className="w-[350px] shadow-2xl shadow-primary">
            <CardHeader>
                <CardTitle>Register <span><Logo /></span></CardTitle>
                <CardDescription>Welcome to PDFGenie.ai 👋</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-2">{error}</div>} {/* Display error message */}
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">UserName</Label>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter Your UserName..."
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Your Email..."
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter The Password..."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm The Password..."
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-4">Register</Button> {/* Submit button */}
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={googleAuth} className="w-full">
                    Sign in With <span className="rounded-full bg-white"><FcGoogle /></span>
                </Button>
              
            </CardFooter>
            <CardFooter>
                <p className="text-sm">Already Have An Account? <Link to={'/login'} className="underline text-primary">Login</Link></p>
            </CardFooter>
        </Card>
    );
}

export default Register;
