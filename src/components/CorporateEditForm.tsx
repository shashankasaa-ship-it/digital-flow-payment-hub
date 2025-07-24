import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Building2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CorporateEditFormProps {
  corporate: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const CorporateEditForm = ({ corporate, onClose, onSave }: CorporateEditFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Corporate Details
    corporateName: corporate.name || "",
    corporateType: "corporate",
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    
    // Account Details
    accounts: [{ accountNumber: "", accountType: "", branchName: "", currency: "INR" }],
    
    // Payment Preferences
    paymentTypes: {
      online: corporate.paymentTypes?.includes("Online") || false,
      bulk: corporate.paymentTypes?.includes("Bulk") || false,
      subscription: corporate.paymentTypes?.includes("Subscription") || false,
      domestic: corporate.paymentTypes?.includes("Domestic") || false,
      international: corporate.paymentTypes?.includes("International") || false
    },
    domesticPaymentMethods: {
      neft: false,
      rtgs: false,
      imps: false,
      upi: false
    },
    paymentFrequency: "monthly",
    monthlyVolume: corporate.monthlyVolume || "",
    averageTransactionAmount: "",
    
    // Authorization
    preAuthorized: false,
    approvers: [{ name: "", email: "", role: "" }],
    
    // Additional Info
    businessCategory: "",
    riskProfile: "low",
    kycDocuments: "",
    
    // Corporate Category and Prioritization
    corporateCategory: corporate.category?.toLowerCase() || "general",
    paymentPrioritization: corporate.priority?.toLowerCase() || "normal"
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

  const handleSubmit = () => {
    onSave(formData);
    toast({
      title: "Corporate Updated Successfully",
      description: `${formData.corporateName} has been updated successfully`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-secondary rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Edit Corporate Details</h2>
              <p className="text-sm text-muted-foreground">Update corporate information and preferences</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="premium">
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateEditForm;