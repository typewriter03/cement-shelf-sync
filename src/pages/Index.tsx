import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import WarehouseDetail from "./WarehouseDetail";
import type { Warehouse } from "@/components/WarehouseCard";
import type { InventoryItem } from "@/components/InventoryTable";

// Sample data
const sampleWarehouses: Warehouse[] = [
  {
    id: "1",
    name: "Central Godown",
    location: "Mumbai Industrial Area",
    totalBags: 15000,
    capacity: 20000,
    lastUpdated: "2 hours ago",
    status: "operational"
  },
  {
    id: "2", 
    name: "North Storage",
    location: "Delhi NCR",
    totalBags: 8500,
    capacity: 10000,
    lastUpdated: "5 hours ago",
    status: "operational"
  },
  {
    id: "3",
    name: "East Warehouse",
    location: "Kolkata Port",
    totalBags: 19800,
    capacity: 20000,
    lastUpdated: "1 day ago",
    status: "full"
  },
  {
    id: "4",
    name: "South Depot",
    location: "Chennai",
    totalBags: 1200,
    capacity: 15000,
    lastUpdated: "3 hours ago",
    status: "maintenance"
  }
];

const sampleInventory: Record<string, InventoryItem[]> = {
  "1": [
    {
      id: "1",
      cementType: "OPC 43 Grade",
      brand: "UltraTech",
      bags: 5000,
      weightPerBag: 50,
      dateReceived: "2024-01-15",
      expiryDate: "2025-01-15",
      location: "Section A1",
      status: "good"
    },
    {
      id: "2",
      cementType: "PPC",
      brand: "ACC",
      bags: 3500,
      weightPerBag: 50,
      dateReceived: "2024-01-20",
      expiryDate: "2025-01-20",
      location: "Section A2",
      status: "good"
    },
    {
      id: "3",
      cementType: "OPC 53 Grade",
      brand: "Ambuja",
      bags: 4000,
      weightPerBag: 50,
      dateReceived: "2023-12-10",
      expiryDate: "2024-12-10",
      location: "Section B1",
      status: "expiring_soon"
    },
    {
      id: "4",
      cementType: "White Cement",
      brand: "Birla White",
      bags: 2500,
      weightPerBag: 40,
      dateReceived: "2024-02-01",
      expiryDate: "2025-02-01",
      location: "Section C1",
      status: "good"
    }
  ],
  "2": [
    {
      id: "5",
      cementType: "OPC 43 Grade",
      brand: "UltraTech",
      bags: 6000,
      weightPerBag: 50,
      dateReceived: "2024-01-18",
      expiryDate: "2025-01-18",
      location: "Section 1",
      status: "good"
    },
    {
      id: "6",
      cementType: "PPC",
      brand: "Shree Cement",
      bags: 2500,
      weightPerBag: 50,
      dateReceived: "2024-02-05",
      expiryDate: "2025-02-05",
      location: "Section 2",
      status: "good"
    }
  ]
};

type ViewState = "login" | "dashboard" | "warehouse";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("login");
  const [currentUser, setCurrentUser] = useState("");
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Simple auth - in real app, this would validate against a backend
    if (username && password) {
      setCurrentUser(username);
      setCurrentView("dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser("");
    setCurrentView("login");
    setSelectedWarehouseId(null);
  };

  const handleWarehouseSelect = (id: string) => {
    setSelectedWarehouseId(id);
    setCurrentView("warehouse");
  };

  const handleBackToDashboard = () => {
    setSelectedWarehouseId(null);
    setCurrentView("dashboard");
  };

  if (currentView === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (currentView === "dashboard") {
    return (
      <Dashboard
        warehouses={sampleWarehouses}
        onWarehouseSelect={handleWarehouseSelect}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
    );
  }

  if (currentView === "warehouse" && selectedWarehouseId) {
    const warehouse = sampleWarehouses.find(w => w.id === selectedWarehouseId);
    const inventory = sampleInventory[selectedWarehouseId] || [];
    
    if (warehouse) {
      return (
        <WarehouseDetail
          warehouse={warehouse}
          inventory={inventory}
          onBack={handleBackToDashboard}
        />
      );
    }
  }

  return <Login onLogin={handleLogin} />;
};

export default Index;
