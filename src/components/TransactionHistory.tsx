import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface InventoryTransaction {
  id: string;
  type: "added" | "removed";
  cementType: string;
  brand: string;
  bags: number;
  timestamp: string;
  reference: string; // supplier invoice or delivery note
}

interface TransactionHistoryProps {
  transactions: InventoryTransaction[];
  godownName: string;
}

export function TransactionHistory({ transactions, godownName }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-cement-dark">
          {godownName} - Inventory Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-cement">Type</TableHead>
                <TableHead className="text-cement">Cement</TableHead>
                <TableHead className="text-cement">Brand</TableHead>
                <TableHead className="text-cement">Bags</TableHead>
                <TableHead className="text-cement">Date</TableHead>
                <TableHead className="text-cement">Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "added" ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <Badge 
                        variant={transaction.type === "added" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {transaction.type === "added" ? "Added" : "Removed"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-cement-dark">
                    {transaction.cementType}
                  </TableCell>
                  <TableCell className="text-cement">{transaction.brand}</TableCell>
                  <TableCell className="text-cement-dark font-medium">
                    {transaction.bags.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-cement">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-cement">{transaction.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}