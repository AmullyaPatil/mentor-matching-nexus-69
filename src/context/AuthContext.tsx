import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";

// Export the User interface so it can be imported by other components
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  connections: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const loggedInUser = {
        id: "mock-id-123",
        name: "Demo User",
        email,
        role: UserRole.MENTEE,
        avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=2787&auto=format&fit=crop",
        connections: 42
      };
      
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast({
        title: "Success",
        description: "Successfully logged in"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: "mock-id-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop",
        connections: 5
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast({
        title: "Success",
        description: "Account created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Signup failed. Please try again.",
        variant: "destructive"
      });
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Success",
      description: "Successfully logged out"
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
