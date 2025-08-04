import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package2, Edit } from "lucide-react";

export interface InventoryItem {
  id: string;
  cementType: string;
  brand: string;
  bags: number;
  weightPerBag: number; // in kg
  dateReceived: string;
  expiryDate: string;
  location: string; // section in warehouse
  status: "good" | "expiring_soon" | "expired";
}

interface InventoryTableProps {
  items: InventoryItem[];
  warehouseName: string;
  onEditItem?: (item: InventoryItem) => void;
}

export function InventoryTable({ items, warehouseName, onEditItem }: InventoryTableProps) {
  const totalBags = items.reduce((sum, item) => sum + item.bags, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cement">Total Bags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cement-dark">
              {totalBags.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cement">Cement Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cement-dark">
              {new Set(items.map(item => item.cementType)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-cement-dark">
            {warehouseName} - Inventory Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-cement">Type</TableHead>
                  <TableHead className="text-cement">Brand</TableHead>
                  <TableHead className="text-cement">Bags</TableHead>
                  <TableHead className="text-cement">Weight/Bag</TableHead>
                  <TableHead className="text-cement">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-cement-dark">
                      {item.cementType}
                    </TableCell>
                    <TableCell className="text-cement">{item.brand}</TableCell>
                    <TableCell className="text-cement-dark font-medium">
                      {item.bags.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-cement">{item.weightPerBag}kg</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditItem?.(item)}
                        className="text-cement hover:text-cement-dark"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}