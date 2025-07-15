import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, Eye, Download } from "lucide-react";

const PaymentSearch = () => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    accountNumber: "",
    channelNumber: "",
    transactionNumber: "",
    mobileNumber: "",
    vpa: "",
    dateFrom: "",
    dateTo: "",
    status: "all",
    amount: ""
  });

  const [searchResults] = useState([
    {
      id: "TXN12345",
      accountNumber: "ACC001234567",
      channelNumber: "CH001",
      amount: "$15,000",
      status: "Completed",
      timestamp: "2024-01-15 10:30:25",
      customerName: "TechCorp Solutions",
      paymentType: "Bulk Transfer",
      reference: "BULK001234",
      fees: "$25.00"
    },
    {
      id: "TXN12346",
      accountNumber: "ACC001234568",
      channelNumber: "CH002",
      amount: "$8,500",
      status: "Pending",
      timestamp: "2024-01-15 09:15:42",
      customerName: "Global Enterprises",
      paymentType: "Online Payment",
      reference: "ONLINE5678",
      fees: "$15.00"
    },
    {
      id: "TXN12347",
      accountNumber: "ACC001234569",
      channelNumber: "CH001",
      amount: "$2,200",
      status: "Failed",
      timestamp: "2024-01-15 08:45:15",
      customerName: "StartupXYZ",
      paymentType: "Subscription",
      reference: "SUB9876",
      fees: "$5.00"
    }
  ]);

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching with criteria:", searchCriteria);
  };

  const clearSearch = () => {
    setSearchCriteria({
      accountNumber: "",
      channelNumber: "",
      transactionNumber: "",
      mobileNumber: "",
      vpa: "",
      dateFrom: "",
      dateTo: "",
      status: "all",
      amount: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-success text-white">Completed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
              <div className="p-2 bg-secondary rounded-lg">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Payment Search</h1>
                <p className="text-sm text-muted-foreground">Search payments by various criteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Criteria</CardTitle>
            <CardDescription>Search payments using multiple criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={searchCriteria.accountNumber}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, accountNumber: e.target.value }))}
                  placeholder="Enter account number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channelNumber">Channel Number</Label>
                <Input
                  id="channelNumber"
                  value={searchCriteria.channelNumber}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, channelNumber: e.target.value }))}
                  placeholder="Enter channel number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionNumber">Transaction Number</Label>
                <Input
                  id="transactionNumber"
                  value={searchCriteria.transactionNumber}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, transactionNumber: e.target.value }))}
                  placeholder="Enter transaction number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  value={searchCriteria.mobileNumber}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, mobileNumber: e.target.value }))}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vpa">UPI VPA</Label>
                <Input
                  id="vpa"
                  value={searchCriteria.vpa}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, vpa: e.target.value }))}
                  placeholder="Enter UPI VPA"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={searchCriteria.amount}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFrom">Date From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={searchCriteria.dateFrom}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, dateFrom: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTo">Date To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={searchCriteria.dateTo}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, dateTo: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={searchCriteria.status}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSearch} variant="premium">
                <Search className="h-4 w-4 mr-2" />
                Search Payments
              </Button>
              <Button onClick={clearSearch} variant="outline">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>Found {searchResults.length} payment records</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{payment.id}</h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{payment.customerName}</p>
                      <p className="text-xs text-muted-foreground">{payment.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">Fees: {payment.fees}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Account Number</p>
                      <p className="font-medium">{payment.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Channel</p>
                      <p className="font-medium">{payment.channelNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment Type</p>
                      <p className="font-medium">{payment.paymentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Reference</p>
                      <p className="font-medium">{payment.reference}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No payments found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSearch;