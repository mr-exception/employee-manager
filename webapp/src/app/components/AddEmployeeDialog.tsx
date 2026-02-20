"use client";

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { IEmployee } from "@employee-manager/specs";

type NewEmployee = Omit<IEmployee, "_id" | "createdAt" | "updatedAt">;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewEmployee) => void;
}

const empty = { name: "", email: "", position: "", salary: "" };

export default function AddEmployeeDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(empty);

  const set = (field: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isValid = form.name && form.email && form.position && Number(form.salary) > 0;

  const handleSubmit = () => {
    onSubmit({ name: form.name, email: form.email, position: form.position, salary: Number(form.salary) });
    setForm(empty);
    onClose();
  };

  const handleClose = () => {
    setForm(empty);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Name</InputLabel>
            <OutlinedInput label="Name" value={form.name} onChange={set("name")} />
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Email</InputLabel>
            <OutlinedInput label="Email" type="email" value={form.email} onChange={set("email")} />
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Position</InputLabel>
            <OutlinedInput label="Position" value={form.position} onChange={set("position")} />
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Salary</InputLabel>
            <OutlinedInput label="Salary" type="number" value={form.salary} onChange={set("salary")} inputProps={{ min: 0 }} />
            <FormHelperText>Annual salary in EUR</FormHelperText>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
