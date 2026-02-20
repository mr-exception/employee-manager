"use client";

import { useState, useEffect } from "react";
import { Box, CircularProgress, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IEmployee } from "@employee-manager/specs";
import EditEmployeeDialog from "./EditEmployeeDialog";
import ConfirmDialog from "./ConfirmDialog";
import { useAppDispatch, useAppSelector, editEmployee, deleteEmployee, fetchEmployees } from "../redux";
import { useDebounce } from "../hooks/useDebounce";

const formatSalary = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

const formatDate = (ts: number) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ts));

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const { data: employees, loading, error } = useAppSelector((state) => state.employees);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editTarget, setEditTarget] = useState<IEmployee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IEmployee | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(fetchEmployees({ search: debouncedSearch || undefined }));
    setPage(0);
  }, [dispatch, debouncedSearch]);

  const paginated = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ py: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email or position…"
          value={search}
          onChange={handleSearchChange}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: 700 } }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((emp) => (
                <TableRow key={emp._id} hover>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell align="right">{formatSalary(emp.salary)}</TableCell>
                  <TableCell>{formatDate(emp.updatedAt)}</TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => setEditTarget(emp)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <IconButton size="small" color="error" onClick={() => setDeleteTarget(emp)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No employees found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={employees.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <EditEmployeeDialog
        employee={editTarget}
        open={editTarget !== null}
        onClose={() => setEditTarget(null)}
        onSubmit={(updated) => {
          dispatch(editEmployee(updated));
          setEditTarget(null);
        }}
      />

      <ConfirmDialog open={deleteTarget !== null} title="Remove Employee" message={`Are you sure you want to remove ${deleteTarget?.name}? This action cannot be undone.`} onConfirm={() => dispatch(deleteEmployee(deleteTarget!._id))} onClose={() => setDeleteTarget(null)} />
    </Box>
  );
}
