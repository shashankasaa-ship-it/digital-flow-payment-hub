import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HolidayCalendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "national",
    affectedChannels: "all",
    cutoffTime: ""
  });

  const holidays = [
    {
      id: 1,
      name: "New Year's Day",
      date: "2024-01-01",
      type: "National",
      affectedChannels: "All Channels",
      cutoffTime: "N/A",
      status: "Active"
    },
    {
      id: 2,
      name: "Independence Day",
      date: "2024-07-04",
      type: "National",
      affectedChannels: "All Channels",
      cutoffTime: "N/A",
      status: "Scheduled"
    },
    {
      id: 3,
      name: "Christmas Day",
      date: "2024-12-25",
      type: "National",
      affectedChannels: "All Channels",
      cutoffTime: "N/A",
      status: "Scheduled"
    },
    {
      id: 4,
      name: "Bank Processing Cutoff",
      date: "2024-01-15",
      type: "Operational",
      affectedChannels: "International Wire",
      cutoffTime: "15:00 EST",
      status: "Active"
    },
    {
      id: 5,
      name: "System Maintenance",
      date: "2024-02-01",
      type: "Technical",
      affectedChannels: "All Online Channels",
      cutoffTime: "02:00-04:00",
      status: "Scheduled"
    }
  ];

  const channels = [
    "All Channels",
    "Domestic Wire",
    "International Wire", 
    "ACH Transfers",
    "Online Payments",
    "Mobile Payments",
    "Bulk Transfers"
  ];

  const handleAddHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      toast({
        title: "Holiday Added",
        description: `${newHoliday.name} has been added to the calendar`,
      });
      setNewHoliday({
        name: "",
        date: "",
        type: "national",
        affectedChannels: "all",
        cutoffTime: ""
      });
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "national":
        return <Badge className="bg-gradient-primary text-white">National</Badge>;
      case "operational":
        return <Badge className="bg-warning text-white">Operational</Badge>;
      case "technical":
        return <Badge className="bg-info text-white">Technical</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-success text-white">Active</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="border-info text-info">Scheduled</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
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
              <div className="p-2 bg-warning rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Payment Holiday Calendar</h1>
                <p className="text-sm text-muted-foreground">Manage payment holidays and cut-off times</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <Card className="mb-8 bg-gradient-hero text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Holiday & Cut-off Management</h2>
            <p className="text-white/90 mb-4">
              Comprehensive holiday calendar management for payment processing. Banks can configure national holidays, 
              operational cut-off times, and technical maintenance windows to ensure smooth payment operations 
              across all channels and customer segments.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">National Holidays</h4>
                <p className="text-white/80">Government declared holidays affecting all payment channels</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Operational Cut-offs</h4>
                <p className="text-white/80">Daily processing deadlines and channel-specific timings</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Maintenance</h4>
                <p className="text-white/80">Scheduled system maintenance and service windows</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Holiday */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add New Holiday/Cut-off</CardTitle>
              <CardDescription>Configure new holiday or cut-off time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Holiday/Event Name</Label>
                <Input
                  id="name"
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter holiday name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newHoliday.type}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="national">National Holiday</option>
                  <option value="operational">Operational Cut-off</option>
                  <option value="technical">Technical Maintenance</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channels">Affected Channels</Label>
                <select
                  id="channels"
                  value={newHoliday.affectedChannels}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, affectedChannels: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                >
                  {channels.map(channel => (
                    <option key={channel} value={channel}>{channel}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cutoffTime">Cut-off Time (if applicable)</Label>
                <Input
                  id="cutoffTime"
                  value={newHoliday.cutoffTime}
                  onChange={(e) => setNewHoliday(prev => ({ ...prev, cutoffTime: e.target.value }))}
                  placeholder="e.g., 15:00 EST or 02:00-04:00"
                />
              </div>

              <Button onClick={handleAddHoliday} variant="premium" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Holiday/Cut-off
              </Button>
            </CardContent>
          </Card>

          {/* Holiday List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Holiday & Cut-off Calendar</CardTitle>
              <CardDescription>Manage existing holidays and operational cut-offs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holidays.map((holiday) => (
                  <div key={holiday.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{holiday.name}</h3>
                          {getTypeBadge(holiday.type)}
                          {getStatusBadge(holiday.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Date: {holiday.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Affected Channels:</p>
                        <p className="font-medium">{holiday.affectedChannels}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cut-off Time:</p>
                        <p className="font-medium">{holiday.cutoffTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Channel-specific Cut-off Times */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Daily Cut-off Times by Channel</CardTitle>
            <CardDescription>Standard operational cut-off times for different payment channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Domestic Wire Transfers</h4>
                <p className="text-2xl font-bold text-primary">16:00 EST</p>
                <p className="text-sm text-muted-foreground">Same day processing deadline</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">International Wires</h4>
                <p className="text-2xl font-bold text-primary">15:00 EST</p>
                <p className="text-sm text-muted-foreground">Next day value deadline</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">ACH Transfers</h4>
                <p className="text-2xl font-bold text-primary">17:30 EST</p>
                <p className="text-sm text-muted-foreground">Next day settlement</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Bulk Payments</h4>
                <p className="text-2xl font-bold text-primary">14:00 EST</p>
                <p className="text-sm text-muted-foreground">File upload deadline</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Online Payments</h4>
                <p className="text-2xl font-bold text-success">24/7</p>
                <p className="text-sm text-muted-foreground">Real-time processing</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Mobile Payments</h4>
                <p className="text-2xl font-bold text-success">24/7</p>
                <p className="text-sm text-muted-foreground">Instant processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HolidayCalendar;