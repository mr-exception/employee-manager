"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, InputAdornment, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
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

const formatSalary = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

const formatDate = (ts: number) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(ts));

export default function EmployeeTable() {
  const dispatch = useAppDispatch();
  const { data: employees, totalRecords, loading, error } = useAppSelector((state) => state.employees);

  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [editTarget, setEditTarget] = useState<IEmployee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IEmployee | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const sortBy = sortModel[0]?.field as SortBy | undefined;
  const sortOrder = (sortModel[0]?.sort ?? "asc") as SortOrder;

  const params = {
    search: debouncedSearch || undefined,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortBy,
    sortOrder: sortBy ? sortOrder : undefined,
  };

  useEffect(() => {
    dispatch(fetchEmployees(params));
  }, [dispatch, debouncedSearch, paginationModel.page, paginationModel.pageSize, sortBy, sortOrder]);

  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [debouncedSearch]);

  useInterval(() => {
    dispatch(refreshEmployees(params));
  }, 20000);

  const handleSortChange = (model: GridSortModel) => {
    setSortModel(model);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const columns: GridColDef<IEmployee>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 120,
      align: "right",
      headerAlign: "right",
      valueFormatter: (value: number) => formatSalary(value),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated At",
      flex: 1,
      minWidth: 180,
      valueFormatter: (value: number) => formatDate(value),
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      width: 90,
      align: "right",
      renderCell: ({ row }) => (
        <>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => setEditTarget(row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton size="small" color="error" onClick={() => setDeleteTarget(row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email or position…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

      {error && totalRecords === 0 ? (
        <ErrorView message={error} />
      ) : (
        <Paper elevation={2}>
          <DataGrid
            rows={employees}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            rowCount={totalRecords}
            paginationMode="server"
            sortingMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={handleSortChange}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            slots={{
              noRowsOverlay: () => (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography color="text.secondary">No employees found.</Typography>
                </Box>
              ),
            }}
            sx={{ border: 0 }}
          />
        </Paper>
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

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Remove Employee"
        message={`Are you sure you want to remove ${deleteTarget?.name}? This action cannot be undone.`}
        onConfirm={() => dispatch(deleteEmployee(deleteTarget!._id))}
        onClose={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
