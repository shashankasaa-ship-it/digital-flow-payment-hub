import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building2, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CorporateOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Corporate Details
    corporateName: "",
    corporateType: "retail", // retail or corporate
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    
    // Account Details
    accounts: [{ accountNumber: "", accountType: "", branchName: "", currency: "INR" }],
    
    // Payment Preferences
    paymentTypes: {
      online: false,
      bulk: false,
      subscription: false,
      domestic: false,
      international: false
    },
    domesticPaymentMethods: {
      neft: false,
      rtgs: false,
      imps: false,
      upi: false
    },
    paymentFrequency: "monthly",
    monthlyVolume: "",
    averageTransactionAmount: "",
    
    // Authorization
    preAuthorized: false,
    approvers: [{ name: "", email: "", role: "" }],
    
    // Additional Info
    businessCategory: "",
    riskProfile: "low",
    kycDocuments: "",
    
    // Corporate Category and Prioritization
    corporateCategory: "general",
    paymentPrioritization: "normal"
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentTypes: { ...prev.paymentTypes, [type]: checked }
    }));
  };

  const handleDomesticPaymentMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      domesticPaymentMethods: { ...prev.domesticPaymentMethods, [method]: checked }
    }));
  };

  const addAccount = () => {
    setFormData(prev => ({
      ...prev,
      accounts: [...prev.accounts, { accountNumber: "", accountType: "", branchName: "", currency: "INR" }]
    }));
  };

  const updateAccount = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      accounts: prev.accounts.map((acc, i) => 
        i === index ? { ...acc, [field]: value } : acc
      )
    }));
  };

  const addApprover = () => {
    setFormData(prev => ({
      ...prev,
      approvers: [...prev.approvers, { name: "", email: "", role: "" }]
    }));
  };

  const updateApprover = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      approvers: prev.approvers.map((app, i) => 
        i === index ? { ...app, [field]: value } : app
      )
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Corporate Onboarded Successfully",
      description: `${formData.corporateName} has been onboarded and is pending approval`,
    });
    // Reset form or navigate
    navigate("/corporate-list");
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
              <div className="p-2 bg-gradient-secondary rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Corporate/Channel Onboarding</h1>
                <p className="text-sm text-muted-foreground">Onboard new corporates and payment channels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onboarding Description */}
        <Card className="mb-8 bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Corporate/Channel Onboarding Process</h2>
            <p className="text-white/90 mb-4">
              Our comprehensive onboarding process ensures seamless integration of new corporates and payment channels
              into the Payment Hub Portal. This includes KYC verification, risk assessment, account setup, and 
              payment preference configuration.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Digital KYC & Document Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Multi-Account Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Payment Method Configuration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8">
          {/* Corporate Details */}
          <Card>
            <CardHeader>
              <CardTitle>Corporate Details</CardTitle>
              <CardDescription>Basic information about the corporate/channel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="corporateName">Corporate Name *</Label>
                  <Input
                    id="corporateName"
                    value={formData.corporateName}
                    onChange={(e) => handleInputChange("corporateName", e.target.value)}
                    placeholder="Enter corporate name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corporateType">Corporate Type *</Label>
                  <select
                    id="corporateType"
                    value={formData.corporateType}
                    onChange={(e) => handleInputChange("corporateType", e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="retail">Retail Corporate</option>
                    <option value="corporate">Corporate Corporate</option>
                  </select>
                </div>
                {formData.corporateType === "corporate" && (
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
                      placeholder="Enter organization name"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Enter contact person name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Configure corporate accounts for payment processing</CardDescription>
                </div>
                <Button onClick={addAccount} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.accounts.map((account, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      value={account.accountNumber}
                      onChange={(e) => updateAccount(index, "accountNumber", e.target.value)}
                      placeholder="Account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <select
                      value={account.accountType}
                      onChange={(e) => updateAccount(index, "accountType", e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="">Select type</option>
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                      <option value="loan">Loan</option>
                      <option value="fd">Fixed Deposit</option>
                    </select>
                  </div>
                   <div className="space-y-2">
                     <Label>Branch Name</Label>
                     <Input
                       value={account.branchName}
                       onChange={(e) => updateAccount(index, "branchName", e.target.value)}
                       placeholder="Branch name"
                     />
                   </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <select
                      value={account.currency}
                      onChange={(e) => updateAccount(index, "currency", e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Preferences</CardTitle>
              <CardDescription>Configure payment types and processing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Payment Types *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  {Object.entries(formData.paymentTypes).map(([type, checked]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={checked}
                        onCheckedChange={(checked) => handlePaymentTypeChange(type, !!checked)}
                      />
                      <Label htmlFor={type} className="capitalize">{type} Payments</Label>
                    </div>
                  ))}
                 </div>
               </div>

               {formData.paymentTypes.domestic && (
                 <div>
                   <Label className="text-base font-medium">Domestic Payment Methods</Label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                     {Object.entries(formData.domesticPaymentMethods).map(([method, checked]) => (
                       <div key={method} className="flex items-center space-x-2">
                         <Checkbox
                           id={method}
                           checked={checked}
                           onCheckedChange={(checked) => handleDomesticPaymentMethodChange(method, !!checked)}
                         />
                         <Label htmlFor={method} className="uppercase">{method}</Label>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <select
                    id="paymentFrequency"
                    value={formData.paymentFrequency}
                    onChange={(e) => handleInputChange("paymentFrequency", e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyVolume">Expected Monthly Volume</Label>
                  <Input
                    id="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={(e) => handleInputChange("monthlyVolume", e.target.value)}
                    placeholder="e.g., ₹100,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="averageTransactionAmount">Average Transaction Amount</Label>
                  <Input
                    id="averageTransactionAmount"
                    value={formData.averageTransactionAmount}
                    onChange={(e) => handleInputChange("averageTransactionAmount", e.target.value)}
                    placeholder="e.g., ₹5,000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authorization Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Authorization Settings</CardTitle>
              <CardDescription>Configure payment authorization requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="preAuthorized"
                  checked={formData.preAuthorized}
                  onCheckedChange={(checked) => handleInputChange("preAuthorized", !!checked)}
                />
                <Label htmlFor="preAuthorized">Payments are pre-authorized (no approval required)</Label>
              </div>

              {!formData.preAuthorized && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">Approval Authorities</Label>
                    <Button onClick={addApprover} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Approver
                    </Button>
                  </div>
                  {formData.approvers.map((approver, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg mb-4">
                      <div className="space-y-2">
                        <Label>Approver Name</Label>
                        <Input
                          value={approver.name}
                          onChange={(e) => updateApprover(index, "name", e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          value={approver.email}
                          onChange={(e) => updateApprover(index, "email", e.target.value)}
                          placeholder="Email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role/Designation</Label>
                        <Input
                          value={approver.role}
                          onChange={(e) => updateApprover(index, "role", e.target.value)}
                          placeholder="Role or designation"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </CardContent>
           </Card>

           {/* Corporate Category and Payment Prioritization */}
           <Card>
             <CardHeader>
               <CardTitle>Corporate Category & Payment Prioritization</CardTitle>
               <CardDescription>Configure corporate tier and payment priority settings</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="corporateCategory">Corporate Category *</Label>
                   <select
                     id="corporateCategory"
                     value={formData.corporateCategory}
                     onChange={(e) => handleInputChange("corporateCategory", e.target.value)}
                     className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                   >
                     <option value="general">General</option>
                     <option value="premium">Premium</option>
                     <option value="enterprise">Enterprise</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="paymentPrioritization">Payment Prioritization *</Label>
                   <select
                     id="paymentPrioritization"
                     value={formData.paymentPrioritization}
                     onChange={(e) => handleInputChange("paymentPrioritization", e.target.value)}
                     className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                   >
                     <option value="low">Low</option>
                     <option value="normal">Normal</option>
                     <option value="high">High</option>
                   </select>
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Submit */}
           <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="premium" size="lg">
              <Building2 className="h-4 w-4 mr-2" />
              Submit for Onboarding
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateOnboarding;