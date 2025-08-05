import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface ClientTransaction {
  id: string;
  clientName: string;
  cementType: string;
  brand: string;
  bagsSent: number;
  amountPaid: number;
  paymentMethod: "cash" | "cheque" | "upi" | "bank_transfer";
  timestamp: string;
  paymentStatus: "paid" | "pending" | "partial";
}

interface ClientLedgerProps {
  transactions: ClientTransaction[];
  godownName: string;
  onAddTransaction?: () => void;
}

export function ClientLedger({ transactions, godownName, onAddTransaction }: ClientLedgerProps) {
  const totalPending = transactions
    .filter(t => t.paymentStatus === "pending" || t.paymentStatus === "partial")
    .reduce((sum, t) => sum + t.amountPaid, 0);

  const totalPaid = transactions
    .filter(t => t.paymentStatus === "paid")
    .reduce((sum, t) => sum + t.amountPaid, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cement">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{totalPaid.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cement">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{totalPending.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-cement-dark">
              {godownName} - Client Ledger
            </CardTitle>
            <Button 
              size="sm" 
              className="bg-industrial hover:bg-industrial/90"
              onClick={onAddTransaction}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-cement">Client</TableHead>
                  <TableHead className="text-cement">Cement</TableHead>
                  <TableHead className="text-cement">Brand</TableHead>
                  <TableHead className="text-cement">Bags</TableHead>
                  <TableHead className="text-cement">Amount</TableHead>
                  <TableHead className="text-cement">Payment</TableHead>
                  <TableHead className="text-cement">Status</TableHead>
                  <TableHead className="text-cement">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-cement-dark">
                      {transaction.clientName}
                    </TableCell>
                    <TableCell className="text-cement">{transaction.cementType}</TableCell>
                    <TableCell className="text-cement">{transaction.brand}</TableCell>
                    <TableCell className="text-cement-dark font-medium">
                      {transaction.bagsSent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-cement-dark font-medium">
                      ₹{transaction.amountPaid.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-cement">
                      {transaction.paymentMethod.replace('_', ' ').toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          transaction.paymentStatus === "paid" ? "default" : 
                          transaction.paymentStatus === "pending" ? "destructive" : 
                          "secondary"
                        }
                      >
                        {transaction.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-cement">
                      {new Date(transaction.timestamp).toLocaleDateString()}
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