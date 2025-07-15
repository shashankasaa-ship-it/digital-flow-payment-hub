import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Shield, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);
      toast({
        title: "Login Successful",
        description: `Welcome ${username}! Redirecting to dashboard...`,
      });
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both username and password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <CreditCard className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold">Payment Hub Portal</h1>
            </div>
            <p className="text-xl text-white/90">
              Comprehensive Digital Payment Management Platform
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Enterprise Payment Solutions</h3>
                <p className="text-white/80">
                  Streamline your organization's payment workflows with our comprehensive hub
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure & Compliant</h3>
                <p className="text-white/80">
                  Bank-grade security with real-time monitoring and fraud prevention
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Multi-Channel Management</h3>
                <p className="text-white/80">
                  Manage multiple payment channels and corporate relationships in one place
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-hover animate-slide-in-right">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your Payment Hub Portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Channel Manager</option>
                  <option value="auditor">Auditor</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full" 
              variant="premium" 
              size="lg"
            >
              Sign In to Dashboard
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Demo Credentials: Any username/password combination</p>
              <p>Select your role to see different dashboard features</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;