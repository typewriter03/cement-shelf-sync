import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package2, Calendar, TrendingUp, TrendingDown } from "lucide-react";

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
}

export function InventoryTable({ items, warehouseName }: InventoryTableProps) {
  const totalBags = items.reduce((sum, item) => sum + item.bags, 0);
  const totalWeight = items.reduce((sum, item) => sum + (item.bags * item.weightPerBag), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-warehouse text-white";
      case "expiring_soon":
        return "bg-yellow-500 text-white";
      case "expired":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-cement text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <TrendingUp className="h-3 w-3" />;
      case "expiring_soon":
        return <Calendar className="h-3 w-3" />;
      case "expired":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Package2 className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium text-cement">Total Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cement-dark">
              {(totalWeight / 1000).toFixed(1)}t
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
                  <TableHead className="text-cement">Location</TableHead>
                  <TableHead className="text-cement">Received</TableHead>
                  <TableHead className="text-cement">Expiry</TableHead>
                  <TableHead className="text-cement">Status</TableHead>
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
                    <TableCell className="text-cement">{item.location}</TableCell>
                    <TableCell className="text-cement">{item.dateReceived}</TableCell>
                    <TableCell className="text-cement">{item.expiryDate}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ')}
                      </Badge>
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