import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  Building2, 
  Calendar, 
  BarChart3, 
  Search, 
  CreditCard,
  Settings,
  LogOut,
  Shield,
  Clock,
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react";

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    setUserRole(localStorage.getItem("userRole") || "user");
    setUsername(localStorage.getItem("username") || "User");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };

  const menuItems = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      color: "bg-gradient-primary",
      route: "/user-management",
      roles: ["admin"]
    },
    {
      title: "Corporate/Channel Onboarding",
      description: "Onboard new corporates and channels",
      icon: UserPlus,
      color: "bg-gradient-secondary",
      route: "/onboarding"
    },
    {
      title: "Corporate/Channel List",
      description: "View and manage all corporates",
      icon: Building2,
      color: "bg-accent",
      route: "/corporate-list"
    },
    {
      title: "Payment Holiday Calendar",
      description: "Manage payment holidays and cut-offs",
      icon: Calendar,
      color: "bg-warning",
      route: "/holiday-calendar"
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive payment insights",
      icon: BarChart3,
      color: "bg-gradient-primary",
      route: "/analytics"
    },
    {
      title: "Payment Tracking",
      description: "Track payment status and monitoring",
      icon: Activity,
      color: "bg-info",
      route: "/payment-tracking"
    },
    {
      title: "Payment Search",
      description: "Search payments by various criteria",
      icon: Search,
      color: "bg-secondary",
      route: "/payment-search"
    },
    {
      title: "Subscription Management",
      description: "Manage corporate payment subscriptions",
      icon: CreditCard,
      color: "bg-success",
      route: "/subscription-management"
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  const stats = [
    { title: "Total Corporates", value: "2,847", icon: Users, change: "+12%" },
    { title: "Active Channels", value: "156", icon: Building2, change: "+8%" },
    { title: "Total Transaction", value: "₹1.2M", icon: DollarSign, change: "+15%" },
    { title: "Success Rate", value: "99.8%", icon: TrendingUp, change: "+0.1%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Payment Hub Portal</h1>
                <p className="text-sm text-muted-foreground">Digital Payment Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">Welcome, {username}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change} from last month</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Payment Hub */}
        <Card className="mb-8 bg-gradient-hero text-white shadow-hover">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">About Payment Hub</h2>
                <p className="text-lg text-white/90 mb-6">
                  A comprehensive digital payment management platform that enables organizations to 
                  streamline payment processing, manage multiple channels, and provide superior 
                  corporate experiences across all payment methods.
                </p>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Real-time payment processing and monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Multi-channel payment orchestration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Advanced analytics and reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Automated compliance and risk management</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Digital Payment Types</h3>
                <div className="grid gap-2 text-white/80">
                  <p>• <strong>Online Payments:</strong> Real-time digital transactions</p>
                  <p>• <strong>Bulk Payments:</strong> High-volume batch processing</p>
                  <p>• <strong>Subscription Payments:</strong> Recurring payment management</p>
                  <p>• <strong>International Transfers:</strong> Cross-border payments</p>
                  <p>• <strong>Mobile Payments:</strong> UPI, wallet, and mobile banking</p>
                  <p>• <strong>Corporate Payments:</strong> B2B payment solutions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Menu */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenuItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-hover transition-all duration-300 cursor-pointer bg-gradient-card" onClick={() => navigate(item.route)}>
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;