import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryTable, type InventoryItem } from "@/components/InventoryTable";
import { TransactionHistory, type InventoryTransaction } from "@/components/TransactionHistory";
import { ClientLedger, type ClientTransaction } from "@/components/ClientLedger";
import { ArrowLeft, Plus, Download } from "lucide-react";
import type { Warehouse } from "@/components/WarehouseCard";

interface WarehouseDetailProps {
  warehouse: Warehouse;
  inventory: InventoryItem[];
  onBack: () => void;
}

// Sample data for transactions
const sampleInventoryTransactions: InventoryTransaction[] = [
  {
    id: "1",
    type: "added",
    cementType: "OPC",
    brand: "UltraTech",
    bags: 500,
    timestamp: "2024-01-15T10:30:00Z",
    reference: "SUP-001"
  },
  {
    id: "2",
    type: "removed",
    cementType: "PPC",
    brand: "ACC",
    bags: 200,
    timestamp: "2024-01-14T14:20:00Z",
    reference: "DEL-001"
  }
];

const sampleClientTransactions: ClientTransaction[] = [
  {
    id: "1",
    clientName: "ABC Construction",
    cementType: "OPC",
    brand: "UltraTech",
    bagsSent: 100,
    amountPaid: 35000,
    paymentMethod: "bank_transfer",
    timestamp: "2024-01-15T09:00:00Z",
    paymentStatus: "paid"
  },
  {
    id: "2",
    clientName: "XYZ Builders",
    cementType: "PPC",
    brand: "ACC",
    bagsSent: 50,
    amountPaid: 17500,
    paymentMethod: "cheque",
    timestamp: "2024-01-14T11:30:00Z",
    paymentStatus: "pending"
  }
];

export default function WarehouseDetail({ 
  warehouse, 
  inventory, 
  onBack 
}: WarehouseDetailProps) {
  const handleEditItem = (item: InventoryItem) => {
    // TODO: Implement edit functionality
    console.log("Edit item:", item);
  };

  const handleAddTransaction = () => {
    // TODO: Implement add transaction functionality
    console.log("Add transaction");
  };
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
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="ledger">Client Ledger</TabsTrigger>
            <TabsTrigger value="transactions">Stock Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-6">
            <InventoryTable 
              items={inventory} 
              warehouseName={warehouse.name}
              onEditItem={handleEditItem}
            />
          </TabsContent>
          
          <TabsContent value="ledger" className="space-y-6">
            <ClientLedger 
              transactions={sampleClientTransactions}
              godownName={warehouse.name}
              onAddTransaction={handleAddTransaction}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <TransactionHistory 
              transactions={sampleInventoryTransactions}
              godownName={warehouse.name}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}