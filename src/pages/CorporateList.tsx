import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Building2, Calendar, Settings, Star, Shield } from "lucide-react";
import CorporateEditForm from "@/components/CorporateEditForm";

const CorporateList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingCorporate, setEditingCorporate] = useState(null);

  const corporates = [
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "Corporate",
      status: "Active",
      category: "Premium",
      accountCount: 5,
      monthlyVolume: "₹2.5M",
      lastActivity: "2024-01-15",
      priority: "High",
      paymentTypes: ["Online", "Bulk", "International"],
      onboardDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Global Enterprises",
      type: "Corporate",
      status: "Active",
      category: "Enterprise",
      accountCount: 12,
      monthlyVolume: "₹8.2M",
      lastActivity: "2024-01-14",
      priority: "Critical",
      paymentTypes: ["Bulk", "Subscription", "International"],
      onboardDate: "2022-03-10"
    },
    {
      id: 3,
      name: "StartupXYZ",
      type: "Corporate",
      status: "Suspended",
      category: "General",
      accountCount: 2,
      monthlyVolume: "₹150K",
      lastActivity: "2024-01-10",
      priority: "Medium",
      paymentTypes: ["Online", "Domestic"],
      onboardDate: "2023-11-20"
    },
    {
      id: 4,
      name: "Retail Chain Plus",
      type: "Corporate",
      status: "Active",
      category: "Premium",
      accountCount: 8,
      monthlyVolume: "₹4.1M",
      lastActivity: "2024-01-15",
      priority: "High",
      paymentTypes: ["Online", "Bulk", "Domestic", "Subscription"],
      onboardDate: "2023-01-05"
    },
    {
      id: 5,
      name: "John Smith Enterprises",
      type: "Retail",
      status: "Pending",
      category: "General",
      accountCount: 1,
      monthlyVolume: "₹25K",
      lastActivity: "2024-01-12",
      priority: "Low",
      paymentTypes: ["Online", "Domestic"],
      onboardDate: "2024-01-10"
    }
  ];

  const filteredCorporates = corporates.filter(corporate => {
    const matchesSearch = corporate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         corporate.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || corporate.status.toLowerCase() === filterStatus;
    const matchesCategory = filterCategory === "all" || corporate.category.toLowerCase() === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case "premium":
        return <Badge className="bg-gradient-primary text-white"><Star className="h-3 w-3 mr-1" />Premium</Badge>;
      case "enterprise":
        return <Badge className="bg-gradient-secondary text-white"><Shield className="h-3 w-3 mr-1" />Enterprise</Badge>;
      case "general":
        return <Badge variant="outline">General</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <Badge className="bg-destructive text-white">Critical</Badge>;
      case "high":
        return <Badge className="bg-warning text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-info text-white">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleEditCorporate = (corporate) => {
    setEditingCorporate(corporate);
  };

  const handleSaveCorporate = (data) => {
    // Here you would typically update the corporate in your state/backend
    console.log("Saving corporate data:", data);
    setEditingCorporate(null);
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
              <div className="p-2 bg-accent rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Corporate/Channel List</h1>
                <p className="text-sm text-muted-foreground">Manage corporate accounts and channels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-64">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search corporates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="h-10 px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
                <option value="general">General</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Corporate List */}
        <div className="space-y-4">
          {filteredCorporates.map((corporate) => (
            <Card key={corporate.id} className="bg-gradient-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {corporate.name.charAt(0)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{corporate.name}</h3>
                        {getStatusBadge(corporate.status)}
                        {getCategoryBadge(corporate.category)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{corporate.type} Corporate</span>
                        <span>•</span>
                        <span>{corporate.accountCount} Accounts</span>
                        <span>•</span>
                        <span>Volume: {corporate.monthlyVolume}/month</span>
                        <span>•</span>
                        <span>Onboarded: {corporate.onboardDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Payment Types:</span>
                        {corporate.paymentTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{type}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">Priority:</span>
                        {getPriorityBadge(corporate.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground">Last Activity: {corporate.lastActivity}</p>
                    </div>
                    
                     <div className="flex flex-col gap-2">
                       <Button variant="outline" size="sm" onClick={() => handleEditCorporate(corporate)}>
                         <Settings className="h-3 w-3 mr-1" />
                         Manage
                       </Button>
                       <Button variant="outline" size="sm">
                         <Calendar className="h-3 w-3 mr-1" />
                         Schedule
                       </Button>
                     </div>
                  </div>
                </div>

                {/* Payment Prioritization Options */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h4 className="text-sm font-medium">Payment Prioritization:</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">High Priority</Button>
                        <Button variant="outline" size="sm">Normal Priority</Button>
                        <Button variant="outline" size="sm">Low Priority</Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Scheduling:</span>
                      <select className="text-xs border border-input rounded px-2 py-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCorporates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No corporates found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
         )}
       </div>

       {/* Edit Form Modal */}
       {editingCorporate && (
         <CorporateEditForm
           corporate={editingCorporate}
           onClose={() => setEditingCorporate(null)}
           onSave={handleSaveCorporate}
         />
       )}
     </div>
   );
 };

 export default CorporateList;