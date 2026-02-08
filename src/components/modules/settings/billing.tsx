"use client";

import { RiAddLine, RiBankCardLine, RiCheckLine, RiDownloadLine, RiDeleteBinLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TabPanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";

interface Props {
  selected: string;
}

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
}

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    period: "month",
    features: ["Up to 5 campaigns", "Basic analytics", "Email support", "1 team member"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    period: "month",
    features: ["Unlimited campaigns", "Advanced analytics", "Priority support", "Up to 10 team members", "API access"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "month",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited team members",
      "SLA guarantee",
      "Custom reporting",
    ],
  },
];

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: "1", type: "visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: "2", type: "mastercard", last4: "8888", expiry: "06/26", isDefault: false },
];

const MOCK_INVOICES: Invoice[] = [
  { id: "INV-001", date: "2024-01-01", amount: 79, status: "paid", description: "Pro Plan - January 2024" },
  { id: "INV-002", date: "2023-12-01", amount: 79, status: "paid", description: "Pro Plan - December 2023" },
  { id: "INV-003", date: "2023-11-01", amount: 79, status: "paid", description: "Pro Plan - November 2023" },
  { id: "INV-004", date: "2023-10-01", amount: 79, status: "paid", description: "Pro Plan - October 2023" },
];

export const Billing = ({ selected }: Props) => {
  const [currentPlan] = useState("pro");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    );
    toast.success("Default payment method updated");
  };

  const handleRemoveCard = (id: string) => {
    const card = paymentMethods.find((pm) => pm.id === id);
    if (card?.isDefault) {
      toast.error("Cannot remove default payment method");
      return;
    }
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    toast.success("Payment method removed");
  };

  const handleAddCard = async () => {
    if (!cardForm.number || !cardForm.expiry || !cardForm.cvc || !cardForm.name) {
      toast.error("Please fill in all card details");
      return;
    }
    setIsAddingCard(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPaymentMethods([
      ...paymentMethods,
      {
        id: String(Date.now()),
        type: "visa",
        last4: cardForm.number.slice(-4),
        expiry: cardForm.expiry,
        isDefault: false,
      },
    ]);
    setIsAddingCard(false);
    setAddCardOpen(false);
    setCardForm({ number: "", expiry: "", cvc: "", name: "" });
    toast.success("Payment method added");
  };

  const getCardIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "MC";
      case "amex":
        return "AMEX";
    }
  };

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <TabPanel selected={selected} value="billing">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Billing & Subscription</h3>
          <p className="text-sm text-gray-500">Manage your subscription plan and payment methods</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="font-medium">Current Plan</h4>
              <p className="text-sm text-gray-500">You are currently on the Pro plan</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">$79</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-lg border p-4",
                  currentPlan === plan.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                {plan.popular && (
                  <span className="bg-primary-500 absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs font-medium text-white">
                    Popular
                  </span>
                )}
                <div className="mb-4">
                  <h5 className="font-semibold">{plan.name}</h5>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-sm text-gray-500">/{plan.period}</span>
                  </div>
                </div>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <RiCheckLine className="size-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  className="w-full"
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h4 className="font-medium">Payment Methods</h4>
              <p className="text-sm text-gray-500">Manage your payment methods</p>
            </div>
            <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <RiAddLine /> Add Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>Enter your card details</DialogDescription>
                </div>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardForm.number}
                      onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiry Date</label>
                      <Input
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVC</label>
                      <Input
                        placeholder="123"
                        value={cardForm.cvc}
                        onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cardholder Name</label>
                    <Input
                      placeholder="John Doe"
                      value={cardForm.name}
                      onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setAddCardOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCard} disabled={isAddingCard}>
                    {isAddingCard ? "Adding..." : "Add Card"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="divide-y">
            {paymentMethods.map((pm) => (
              <div key={pm.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100">
                    <RiBankCardLine className="size-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {getCardIcon(pm.type)} •••• {pm.last4}
                      </p>
                      {pm.isDefault && (
                        <span className="bg-primary-100 text-primary-700 rounded-full px-2 py-0.5 text-xs font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Expires {pm.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!pm.isDefault && (
                    <Button size="sm" variant="ghost" onClick={() => handleSetDefault(pm.id)}>
                      Set Default
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveCard(pm.id)}
                  >
                    <RiDeleteBinLine className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h4 className="font-medium">Invoice History</h4>
            <p className="text-sm text-gray-500">Download your past invoices</p>
          </div>
          <div className="divide-y">
            {MOCK_INVOICES.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-gray-500">{invoice.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium capitalize",
                      getStatusColor(invoice.status),
                    )}
                  >
                    {invoice.status}
                  </span>
                  <span className="font-medium">${invoice.amount}</span>
                  <Button size="sm" variant="ghost">
                    <RiDownloadLine className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h4 className="mb-4 font-medium">Billing Information</h4>
          <div className="grid max-w-lg grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Billing Email</p>
              <p className="font-medium">billing@example.com</p>
            </div>
            <div>
              <p className="text-gray-500">Billing Address</p>
              <p className="font-medium">123 Main St, New York, NY</p>
            </div>
            <div>
              <p className="text-gray-500">Tax ID</p>
              <p className="font-medium">US123456789</p>
            </div>
            <div>
              <p className="text-gray-500">Next Billing Date</p>
              <p className="font-medium">February 1, 2024</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4">
            Edit Billing Info
          </Button>
        </div>
      </div>
    </TabPanel>
  );
};
