import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerDemo } from '@/components/ui/date-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 200, type: 'income', brand: 'Nike' },
    { id: 2, date: new Date(), amount: 150, type: 'expense', brand: 'Adidas' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: new Date(),
    amount: '',
    type: 'income',
    brand: 'Nike',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    toast('Transaction added successfully.');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    toast('Transaction deleted successfully.');
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <DatePickerDemo />
            <Input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
            <Select name="type" value={newTransaction.type} onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select name="brand" value={newTransaction.brand} onValueChange={(value) => setNewTransaction({ ...newTransaction, brand: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date.toDateString()}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.brand}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => handleDeleteTransaction(transaction.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;