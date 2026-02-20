"use client";

import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IEmployee } from "@employee-manager/specs";
import EmployeeTable from "./components/EmployeeTable";
import AddEmployeeDialog from "./components/AddEmployeeDialog";
import { useAppDispatch, addEmployee } from "./redux";

export default function Home() {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = (data: Omit<IEmployee, "_id" | "createdAt" | "updatedAt">) => {
    dispatch(addEmployee(data));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" component="h1" fontWeight={600}>
          Employees
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          Add
        </Button>
      </Box>
      <EmployeeTable />
      <AddEmployeeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={handleAdd} />
    </Container>
  );
}
