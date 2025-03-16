
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, USER_ROLE_LABELS, USER_ROLE_DESCRIPTIONS } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeft } from "lucide-react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("signup") === "true";
  const [activeTab, setActiveTab] = useState(isSignup ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (activeTab === "login") {
        await login(email, password);
        navigate("/dashboard");
      } else {
        if (!role) {
          throw new Error("Please select a role");
        }
        await signup(name, email, password, role as UserRole);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {activeTab === "login" ? "Log In" : "Create an Account"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login"
                  ? "Enter your credentials to access your account"
                  : "Join our platform to connect with startup professionals"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex mb-6">
                <div
                  className={`flex-1 py-2 text-center font-medium cursor-pointer transition-colors ${
                    activeTab === "login"
                      ? "text-foreground border-b-2 border-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  Log In
                </div>
                <div
                  className={`flex-1 py-2 text-center font-medium cursor-pointer transition-colors ${
                    activeTab === "signup"
                      ? "text-foreground border-b-2 border-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {activeTab === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <Select
                      value={role}
                      onValueChange={(value) => setRole(value as UserRole)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            <div>
                              <div>{USER_ROLE_LABELS[role]}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {USER_ROLE_DESCRIPTIONS[role]}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={
                    isSubmitting ||
                    !email ||
                    !password ||
                    (activeTab === "signup" && (!name || !role))
                  }
                >
                  {isSubmitting
                    ? "Please wait..."
                    : activeTab === "login"
                    ? "Log In"
                    : "Create Account"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col">
              {activeTab === "login" ? (
                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setActiveTab("login")}
                  >
                    Log in
                  </button>
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
