import { Button } from "@/components/ui/button";
import { WarehouseCard, type Warehouse } from "@/components/WarehouseCard";
import { LogOut, Plus } from "lucide-react";

interface DashboardProps {
  warehouses: Warehouse[];
  onWarehouseSelect: (id: string) => void;
  onLogout: () => void;
  currentUser: string;
}

export default function Dashboard({ 
  warehouses, 
  onWarehouseSelect, 
  onLogout, 
  currentUser 
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-cement-light bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-cement-dark">
                Cement Inventory System
              </h1>
              <p className="text-cement">Welcome back, {currentUser}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Godown
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="text-cement hover:text-cement-dark"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-cement-dark mb-2">
            Godown Overview
          </h2>
          <p className="text-cement">
            Manage your cement inventory across {warehouses.length} godowns
          </p>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              onClick={onWarehouseSelect}
            />
          ))}
        </div>

        {warehouses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cement mb-4">No godowns found</p>
            <Button className="bg-industrial hover:bg-industrial/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Godown
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}