"use client";

import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { IEmployee } from "@employee-manager/specs";

interface Props {
  employee: IEmployee | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (updated: IEmployee) => void;
}

export default function EditEmployeeDialog({ employee, open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });

  useEffect(() => {
    if (employee) {
      setForm({ name: employee.name, email: employee.email, position: employee.position, salary: String(employee.salary) });
    }
  }, [employee]);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isValid = form.name && form.email && form.position && Number(form.salary) > 0;

  const handleSubmit = () => {
    if (!employee) return;
    onSubmit({ ...employee, name: form.name, email: form.email, position: form.position, salary: Number(form.salary), updatedAt: Date.now() });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Employee</DialogTitle>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
