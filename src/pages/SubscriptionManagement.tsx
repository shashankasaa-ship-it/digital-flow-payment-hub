import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Search, Pause, Play, X, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const subscriptions = [
    {
      id: 1,
      corporateName: "TechCorp Solutions",
      subscriptionType: "File Payment",
      plan: "Enterprise",
      status: "Active",
      startDate: "2023-06-15",
      nextBilling: "2024-02-15",
      amount: "₹2,500/month",
      features: ["Bulk Processing", "API Access", "Priority Support"],
      transactionLimit: "Unlimited",
      frequency: "Monthly"
    },
    {
      id: 2,
      corporateName: "Global Enterprises",
      subscriptionType: "International Payment",
      plan: "Premium",
      status: "Active",
      startDate: "2022-03-10",
      nextBilling: "2024-02-10",
      amount: "₹5,000/month",
      features: ["Multi-Currency", "Swift Network", "Compliance Tools"],
      transactionLimit: "50,000/month",
      frequency: "Monthly"
    },
    {
      id: 3,
      corporateName: "StartupXYZ",
      subscriptionType: "Open Payment",
      plan: "Basic",
      status: "Suspended",
      startDate: "2023-11-20",
      nextBilling: "N/A",
      amount: "₹500/month",
      features: ["Basic Processing", "Standard Support"],
      transactionLimit: "1,000/month",
      frequency: "Monthly"
    },
    {
      id: 4,
      corporateName: "Retail Chain Plus",
      subscriptionType: "File Payment",
      plan: "Professional",
      status: "Active",
      startDate: "2023-01-05",
      nextBilling: "2024-02-05",
      amount: "₹1,800/month",
      features: ["Scheduled Payments", "Reporting", "Integration Support"],
      transactionLimit: "25,000/month",
      frequency: "Monthly"
    },
    {
      id: 5,
      corporateName: "Manufacturing Corp",
      subscriptionType: "Domestic Payment",
      plan: "Enterprise",
      status: "Active",
      startDate: "2023-08-12",
      nextBilling: "2024-02-12",
      amount: "₹3,200/month",
      features: ["High Volume", "Custom Workflows", "Dedicated Manager"],
      transactionLimit: "100,000/month",
      frequency: "Monthly"
    }
  ];

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.corporateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.subscriptionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "expired":
        return <Badge variant="outline" className="border-warning text-warning">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "enterprise":
        return <Badge className="bg-gradient-primary text-white">Enterprise</Badge>;
      case "premium":
        return <Badge className="bg-gradient-secondary text-white">Premium</Badge>;
      case "professional":
        return <Badge className="bg-accent text-white">Professional</Badge>;
      case "basic":
        return <Badge variant="outline">Basic</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const handleSuspendSubscription = (id: number, corporateName: string) => {
    toast({
      title: "Subscription Suspended",
      description: `${corporateName}'s subscription has been suspended`,
      variant: "destructive",
    });
  };

  const handleReactivateSubscription = (id: number, corporateName: string) => {
    toast({
      title: "Subscription Reactivated",
      description: `${corporateName}'s subscription has been reactivated`,
    });
  };

  const handleRevokeSubscription = (id: number, corporateName: string) => {
    toast({
      title: "Subscription Revoked",
      description: `${corporateName}'s subscription has been permanently revoked`,
      variant: "destructive",
    });
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
              <div className="p-2 bg-success rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Subscription Management</h1>
                <p className="text-sm text-muted-foreground">Manage corporate payment subscriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <Card className="mb-6 bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Payment Subscription Services</h2>
            <p className="text-white/90 mb-4">
              Comprehensive subscription management for various payment types including file-based payments, 
              open payment systems, and international transfer subscriptions with flexible plans and features.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">File Payment Subscriptions</h4>
                <p className="text-white/80">Batch processing, scheduled uploads, automated reconciliation</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Open Payment Systems</h4>
                <p className="text-white/80">Real-time processing, API integration, custom workflows</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">International Payments</h4>
                <p className="text-white/80">Multi-currency, SWIFT compliance, global coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription List */}
        <div className="space-y-6">
          {filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="bg-gradient-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{subscription.corporateName}</h3>
                      {getStatusBadge(subscription.status)}
                      {getPlanBadge(subscription.plan)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{subscription.subscriptionType}</span>
                      <span>•</span>
                      <span>Started: {subscription.startDate}</span>
                      <span>•</span>
                      <span>Next Billing: {subscription.nextBilling}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{subscription.amount}</p>
                    <p className="text-sm text-muted-foreground">{subscription.frequency}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Subscription Features</h4>
                    <div className="space-y-2">
                      {subscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Subscription Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction Limit:</span>
                        <span className="font-medium">{subscription.transactionLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing Frequency:</span>
                        <span className="font-medium">{subscription.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan Type:</span>
                        <span className="font-medium">{subscription.plan}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  
                  {subscription.status === "Active" ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSuspendSubscription(subscription.id, subscription.corporateName)}
                    >
                      <Pause className="h-3 w-3 mr-1" />
                      Suspend
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleReactivateSubscription(subscription.id, subscription.corporateName)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Reactivate
                    </Button>
                  )}
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRevokeSubscription(subscription.id, subscription.corporateName)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Revoke
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No subscriptions found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;