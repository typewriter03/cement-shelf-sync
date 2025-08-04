import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Package, TrendingUp, TrendingDown } from "lucide-react";

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  totalBags: number;
  capacity: number;
  lastUpdated: string;
  status: "operational" | "maintenance" | "full";
}

interface WarehouseCardProps {
  warehouse: Warehouse;
  onClick: (id: string) => void;
}

export function WarehouseCard({ warehouse, onClick }: WarehouseCardProps) {
  const utilizationPercent = Math.round((warehouse.totalBags / warehouse.capacity) * 100);
  const isNearCapacity = utilizationPercent > 90;
  const isLowStock = utilizationPercent < 20;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-warehouse text-white";
      case "maintenance":
        return "bg-yellow-500 text-white";
      case "full":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-cement text-white";
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-cement-light"
      onClick={() => onClick(warehouse.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-cement" />
            <CardTitle className="text-lg text-cement-dark">{warehouse.name}</CardTitle>
          </div>
          <Badge className={getStatusColor(warehouse.status)}>
            {warehouse.status}
          </Badge>
        </div>
        <CardDescription className="text-cement">{warehouse.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4 text-cement" />
              <span className="text-sm font-medium text-cement">Total Bags</span>
            </div>
            <p className="text-2xl font-bold text-cement-dark">
              {warehouse.totalBags.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              {isNearCapacity ? (
                <TrendingUp className="h-4 w-4 text-destructive" />
              ) : isLowStock ? (
                <TrendingDown className="h-4 w-4 text-yellow-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-warehouse" />
              )}
              <span className="text-sm font-medium text-cement">Utilization</span>
            </div>
            <p className="text-2xl font-bold text-cement-dark">
              {utilizationPercent}%
            </p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-cement-light">
          <p className="text-xs text-cement">
            Capacity: {warehouse.capacity.toLocaleString()} bags
          </p>
          <p className="text-xs text-cement">
            Last updated: {warehouse.lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}