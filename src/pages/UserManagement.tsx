import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Shield, 
  Check, 
  X, 
  Edit, 
  Trash2,
  Users,
  UserCheck,
  UserX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "user",
    department: ""
  });

  const [users] = useState([
    { id: 1, username: "john.doe", email: "john@company.com", role: "user", status: "active", department: "Finance", lastLogin: "2024-01-15" },
    { id: 2, username: "jane.smith", email: "jane@company.com", role: "manager", status: "pending", department: "Operations", lastLogin: "2024-01-14" },
    { id: 3, username: "mike.wilson", email: "mike@company.com", role: "admin", status: "active", department: "IT", lastLogin: "2024-01-15" },
    { id: 4, username: "sarah.davis", email: "sarah@company.com", role: "auditor", status: "suspended", department: "Compliance", lastLogin: "2024-01-10" },
    { id: 5, username: "tom.brown", email: "tom@company.com", role: "user", status: "pending", department: "Finance", lastLogin: "Never" },
  ]);

  const roles = [
    { value: "user", label: "User", description: "Basic payment portal access" },
    { value: "manager", label: "Channel Manager", description: "Manage customer channels and approvals" },
    { value: "admin", label: "Administrator", description: "Full system access and user management" },
    { value: "auditor", label: "Auditor", description: "Read-only access for compliance monitoring" }
  ];

  const handleCreateUser = () => {
    if (newUser.username && newUser.email) {
      toast({
        title: "User Created",
        description: `User ${newUser.username} has been created successfully`,
      });
      setNewUser({ username: "", email: "", role: "user", department: "" });
    }
  };

  const handleApproveUser = (userId: number, username: string) => {
    toast({
      title: "User Approved",
      description: `User ${username} has been approved and activated`,
    });
  };

  const handleRejectUser = (userId: number, username: string) => {
    toast({
      title: "User Rejected",
      description: `User ${username} has been rejected`,
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: "bg-gradient-primary text-white",
      manager: "bg-gradient-secondary text-white",
      auditor: "bg-info text-white",
      user: "bg-muted text-muted-foreground"
    };
    return <Badge className={roleConfig[role as keyof typeof roleConfig] || "bg-muted"}>{role}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">User Management</h1>
                <p className="text-sm text-muted-foreground">Manage portal users and permissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User List</TabsTrigger>
            <TabsTrigger value="create">Create User</TabsTrigger>
            <TabsTrigger value="roles">Role Management</TabsTrigger>
          </TabsList>

          {/* User List Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Portal Users</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{user.username}</p>
                            {getRoleBadge(user.role)}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.department} • Last login: {user.lastLogin}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(user.status)}
                        {user.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleApproveUser(user.id, user.username)}
                            >
                              <Check className="h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectUser(user.id, user.username)}
                            >
                              <X className="h-3 w-3" />
                              Reject
                            </Button>
                          </div>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create User Tab */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New User</CardTitle>
                <CardDescription>Add a new user to the payment portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={newUser.department}
                      onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Enter department"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateUser} variant="premium" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create User Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Role Management Tab */}
          <TabsContent value="roles">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Definitions</CardTitle>
                  <CardDescription>System roles and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {roles.map((role) => (
                      <div key={role.value} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gradient-primary rounded-lg">
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{role.label}</h3>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                        </div>
                        {getRoleBadge(role.value)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagement;