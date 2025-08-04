import { Button } from "@/components/ui/button";
import { InventoryTable, type InventoryItem } from "@/components/InventoryTable";
import { ArrowLeft, Plus, Download } from "lucide-react";
import type { Warehouse } from "@/components/WarehouseCard";

interface WarehouseDetailProps {
  warehouse: Warehouse;
  inventory: InventoryItem[];
  onBack: () => void;
}

export default function WarehouseDetail({ 
  warehouse, 
  inventory, 
  onBack 
}: WarehouseDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-cement-light bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="text-cement hover:text-cement-dark"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-cement-dark">
                  {warehouse.name}
                </h1>
                <p className="text-cement">{warehouse.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-industrial hover:bg-industrial/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <InventoryTable 
          items={inventory} 
          warehouseName={warehouse.name} 
        />
      </main>
    </div>
  );
}