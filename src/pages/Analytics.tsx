import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Download, Calendar, TrendingUp, DollarSign, Users, Activity, Clock } from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("7days");
  const [reportType, setReportType] = useState("summary");

  const stats = {
    transactions: {
      total: 15847,
      successful: 15623,
      failed: 156,
      returned: 68,
      successRate: 98.6
    },
    volume: {
      total: "$45.2M",
      average: "$2,851",
      peak: "$8.9M",
      growth: "+12.5%"
    },
    channels: {
      online: 8450,
      bulk: 4680,
      subscription: 2717
    },
    approval: {
      pending: 23,
      stage1: 12,
      stage2: 8,
      stage3: 3
    }
  };

  const recentTransactions = [
    { id: "TXN001", customer: "TechCorp", amount: "$15,000", type: "Bulk", status: "Successful", time: "10:30 AM" },
    { id: "TXN002", customer: "GlobalInc", amount: "$8,500", type: "Online", status: "Successful", time: "10:25 AM" },
    { id: "TXN003", customer: "StartupXYZ", amount: "$2,200", type: "Subscription", status: "Failed", time: "10:20 AM" },
    { id: "TXN004", customer: "RetailPlus", amount: "$25,000", type: "International", status: "Pending", time: "10:15 AM" },
    { id: "TXN005", customer: "Enterprise Co", amount: "$50,000", type: "Bulk", status: "Successful", time: "10:10 AM" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
        return <Badge className="bg-success text-white">Successful</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "returned":
        return <Badge className="bg-info text-white">Returned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const generateReport = () => {
    // Simulate report generation
    const reportData = {
      dateRange,
      reportType,
      generatedAt: new Date().toISOString(),
      data: stats
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-report-${dateRange}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Comprehensive payment insights and reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="h-10 px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="h-10 px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="summary">Summary Report</option>
                  <option value="detailed">Detailed Report</option>
                  <option value="channel">Channel Analysis</option>
                  <option value="customer">Customer Analysis</option>
                </select>
              </div>
              <Button onClick={generateReport} variant="premium">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold">{stats.transactions.total.toLocaleString()}</p>
                  <p className="text-xs text-success">+8.2% from last period</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold">{stats.volume.total}</p>
                  <p className="text-xs text-success">{stats.volume.growth} from last period</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.transactions.successRate}%</p>
                  <p className="text-xs text-success">+0.3% from last period</p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold">{stats.approval.pending}</p>
                  <p className="text-xs text-warning">Needs attention</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-full">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transaction Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Breakdown</CardTitle>
              <CardDescription>Analysis by status and type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Successful</p>
                    <p className="text-2xl font-bold text-success">{stats.transactions.successful}</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Failed</p>
                    <p className="text-2xl font-bold text-destructive">{stats.transactions.failed}</p>
                  </div>
                </div>
                <div className="p-4 bg-info/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Returned</p>
                  <p className="text-2xl font-bold text-info">{stats.transactions.returned}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Transaction count by channel type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-primary/10 rounded-lg">
                  <span className="font-medium">Online Payments</span>
                  <span className="text-lg font-bold">{stats.channels.online}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-secondary/10 rounded-lg">
                  <span className="font-medium">Bulk Payments</span>
                  <span className="text-lg font-bold">{stats.channels.bulk}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                  <span className="font-medium">Subscription</span>
                  <span className="text-lg font-bold">{stats.channels.subscription}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals by Stage */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Approvals by Stage</CardTitle>
            <CardDescription>Transaction approval workflow status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-3xl font-bold text-warning">{stats.approval.pending}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Stage 1 Review</p>
                <p className="text-2xl font-bold">{stats.approval.stage1}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Stage 2 Approval</p>
                <p className="text-2xl font-bold">{stats.approval.stage2}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Final Authorization</p>
                <p className="text-2xl font-bold">{stats.approval.stage3}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Transaction Monitor */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Transaction Monitor</CardTitle>
            <CardDescription>Recent transaction activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {transaction.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.id}</p>
                      <p className="text-sm text-muted-foreground">{transaction.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{transaction.type}</p>
                    </div>
                    {getStatusBadge(transaction.status)}
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;