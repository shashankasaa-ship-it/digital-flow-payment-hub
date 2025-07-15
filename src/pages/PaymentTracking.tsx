import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Eye, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const PaymentTracking = () => {
  const navigate = useNavigate();
  const [autoRefresh, setAutoRefresh] = useState(true);

  const paymentJobs = [
    {
      id: "JOB001",
      name: "Daily Bulk Payment Processing",
      status: "Running",
      progress: 75,
      totalTransactions: 2500,
      processedTransactions: 1875,
      startTime: "2024-01-15 06:00:00",
      estimatedCompletion: "2024-01-15 08:30:00",
      priority: "High"
    },
    {
      id: "JOB002",
      name: "International Wire Transfers",
      status: "Completed",
      progress: 100,
      totalTransactions: 150,
      processedTransactions: 150,
      startTime: "2024-01-15 05:00:00",
      estimatedCompletion: "2024-01-15 07:15:00",
      priority: "Critical"
    },
    {
      id: "JOB003",
      name: "Subscription Payment Collection",
      status: "Failed",
      progress: 25,
      totalTransactions: 800,
      processedTransactions: 200,
      startTime: "2024-01-15 04:00:00",
      estimatedCompletion: "N/A",
      priority: "Medium"
    }
  ];

  const realtimePayments = [
    {
      id: "PAY001",
      customer: "TechCorp Solutions",
      amount: "$15,000",
      status: "Processing",
      stage: "Authorization",
      timestamp: "10:35:22",
      estimatedTime: "2 minutes"
    },
    {
      id: "PAY002",
      customer: "Global Enterprises",
      amount: "$8,500",
      status: "Completed",
      stage: "Settlement",
      timestamp: "10:33:15",
      estimatedTime: "Completed"
    },
    {
      id: "PAY003",
      customer: "StartupXYZ",
      amount: "$2,200",
      status: "Failed",
      stage: "Validation",
      timestamp: "10:30:45",
      estimatedTime: "Failed"
    },
    {
      id: "PAY004",
      customer: "Retail Chain Plus",
      amount: "$25,000",
      status: "Pending",
      stage: "Queue",
      timestamp: "10:36:10",
      estimatedTime: "5 minutes"
    }
  ];

  const getJobStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "running":
        return <Badge className="bg-info text-white animate-pulse"><Clock className="h-3 w-3 mr-1" />Running</Badge>;
      case "completed":
        return <Badge className="bg-success text-white"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case "queued":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Queued</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Badge className="bg-info text-white animate-pulse">Processing</Badge>;
      case "completed":
        return <Badge className="bg-success text-white">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
              <div className="p-2 bg-info rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Payment Tracking & Monitoring</h1>
                <p className="text-sm text-muted-foreground">Real-time payment status and job monitoring</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button
                variant={autoRefresh ? "premium" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Payment Job Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Job Status</CardTitle>
            <CardDescription>Monitor batch payment processing jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {paymentJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-6 bg-gradient-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{job.name}</h3>
                        {getJobStatusBadge(job.status)}
                        {getPriorityBadge(job.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">Job ID: {job.id}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all duration-300" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{job.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Transactions</p>
                      <p className="font-medium">{job.processedTransactions.toLocaleString()} / {job.totalTransactions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Start Time</p>
                      <p className="font-medium">{job.startTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Est. Completion</p>
                      <p className="font-medium">{job.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Payment Monitoring */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Real-time Payment Monitoring</CardTitle>
                <CardDescription>Live payment transaction tracking</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {realtimePayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {payment.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{payment.id}</p>
                        {getPaymentStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{payment.customer}</p>
                      <p className="text-xs text-muted-foreground">Stage: {payment.stage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-lg">{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">Time: {payment.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{payment.estimatedTime}</p>
                      <p className="text-xs text-muted-foreground">Est. completion</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge className="bg-success text-white">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-success text-white">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Message Queue</span>
                  <Badge className="bg-success text-white">Running</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-success text-white">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-info" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">TPS (Current)</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="font-medium">156ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Queue Length</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-success">99.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Alerts & Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium">High Queue Volume</p>
                  <p className="text-xs text-muted-foreground">Payment queue above threshold</p>
                </div>
                <div className="p-3 bg-info/10 border border-info/20 rounded-lg">
                  <p className="text-sm font-medium">Scheduled Maintenance</p>
                  <p className="text-xs text-muted-foreground">Tonight 2:00-4:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;