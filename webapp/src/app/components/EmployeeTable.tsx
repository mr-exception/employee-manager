"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip, Typography } from "@mui/material";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IEmployee } from "@employee-manager/specs";
import EditEmployeeDialog from "./EditEmployeeDialog";
import ConfirmDialog from "./ConfirmDialog";
import { useAppDispatch, useAppSelector, editEmployee, deleteEmployee, fetchEmployees, refreshEmployees } from "../redux";
import { useDebounce } from "../hooks/useDebounce";
import { useInterval } from "../hooks/useInterval";
import { SortBy, SortOrder } from "../apis/employee";

const formatSalary = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

const formatDate = (ts: number) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ts));

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

interface Column {
  label: string;
  field: SortBy;
  align?: "right";
}

const COLUMNS: Column[] = [
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Position", field: "position" },
  { label: "Salary", field: "salary", align: "right" },
  { label: "Last Updated At", field: "updatedAt" },
];

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const { data: employees, loading, error } = useAppSelector((state) => state.employees);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editTarget, setEditTarget] = useState<IEmployee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IEmployee | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const params = {
    search: debouncedSearch || undefined,
    sortBy,
    sortOrder: sortBy ? sortOrder : undefined,
  };

  useEffect(() => {
    dispatch(fetchEmployees(params));
    setPage(0);
  }, [dispatch, debouncedSearch, sortBy, sortOrder]);

  useInterval(() => {
    dispatch(refreshEmployees(params));
  }, 20000);

  const handleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const paginated = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

      {loading ? (
        <LoadingView message="Fetching employees…" />
      ) : error ? (
        <ErrorView message={error} />
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 700 } }}>
                {COLUMNS.map((col) => (
                  <TableCell key={col.field} align={col.align}>
                    <TableSortLabel
                      active={sortBy === col.field}
                      direction={sortBy === col.field ? sortOrder : "asc"}
                      onClick={() => handleSort(col.field)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
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
      )}

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
