"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { IEmployee } from "@employee-manager/specs";
import { useModalContainer } from "../hooks/useModalContainer";

interface Props {
  employee: IEmployee | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (updated: IEmployee) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  position: Yup.string().required("Position is required"),
  salary: Yup.number().typeError("Salary must be a number").positive("Salary must be greater than 0").required("Salary is required"),
});

export default function EditEmployeeDialog({ employee, open, onClose, onSubmit }: Props) {
  const modalContainer = useModalContainer();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: employee?.name ?? "",
      email: employee?.email ?? "",
      position: employee?.position ?? "",
      salary: employee?.salary != null ? String(employee.salary) : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!employee) return;
      onSubmit({ ...employee, name: values.name, email: values.email, position: values.position, salary: Number(values.salary), updatedAt: Date.now() });
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" container={modalContainer}>
      <DialogTitle>Edit Employee</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl size="small" fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput label="Name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <FormHelperText>{formik.errors.name}</FormHelperText>
              )}
            </FormControl>

            <FormControl size="small" fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput label="Email" type="email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl size="small" fullWidth error={formik.touched.position && Boolean(formik.errors.position)}>
              <InputLabel>Position</InputLabel>
              <OutlinedInput label="Position" {...formik.getFieldProps("position")} />
              {formik.touched.position && formik.errors.position && (
                <FormHelperText>{formik.errors.position}</FormHelperText>
              )}
            </FormControl>

            <FormControl size="small" fullWidth error={formik.touched.salary && Boolean(formik.errors.salary)}>
              <InputLabel>Salary</InputLabel>
              <OutlinedInput label="Salary" type="number" {...formik.getFieldProps("salary")} inputProps={{ min: 0 }} />
              <FormHelperText>{formik.touched.salary && formik.errors.salary ? formik.errors.salary : "Annual salary in EUR"}</FormHelperText>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
