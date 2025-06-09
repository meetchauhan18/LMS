import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  TableSortLabel,
  Skeleton,
} from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";

const ReusableTable = ({ columns, rows, actions, isLoading }) => {
  const [page, setPage] = React.useState(0); // should start at 0 for TablePagination
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = useState(null); //null, asc desc
  const [orderBy, setOrderBy] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    try {
      const isAsc = orderBy === field && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(field);
    } catch (error) {
      console.error(error);
    }
  };

  const sortedRows = useMemo(() => {
    if (!orderBy) return rows;

    return [...rows].sort((a, b) => {
      const first = a[orderBy] || "";
      const last = b[orderBy] || "";

      if (typeof first === "number" && last === "number") {
        return order === "asc" ? first - last : last - first;
      }

      return order === "asc" &&
        typeof first === "string" &&
        typeof last === "string"
        ? first.toLowerCase().localeCompare(String(last))
        : last.toLowerCase().localeCompare(String(first));
    });
  }, [rows, order, orderBy]);

  // Defensive: filter out null/undefined rows
  const safeRows = Array.isArray(rows)
    ? sortedRows?.filter((row) => row && typeof row === "object")
    : [];

  // Calculate paginated rows
  const paginatedRows =
    safeRows.length > 0
      ? safeRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : [];

  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: "700px",
          "& .MuiTableCell-root": { padding: "4px 8px" },
          "& .MuiTableRow-root": { height: 32 },
        }}
      >
        <TableHead>
          <TableRow>
            {columns?.map((column, columnIndex) => (
              <TableCell
                key={columnIndex}
                align="center"
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : "asc"}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            {actions && (
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            [...Array(rowsPerPage)].map((_, i) => (
              <TableRow key={i}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    <Skeleton variant="text" width="80%" height={20} />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center" sx={{display: "flex", gap: 4, justifyContent: "center", alignItems: "center"}}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : paginatedRows.length > 0 ? (
            paginatedRows.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex} align="center">
                    {column.field === "index"
                      ? page * rowsPerPage + rowIndex + 1
                      : row[column.field] || "-"}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    {actions.map((action, actionIndex) => (
                      <Tooltip
                        title={action.label || "Tooltip"}
                        key={actionIndex}
                      >
                        <Button onClick={() => action.onClick(row)}>
                          {action.icon}
                        </Button>
                      </Tooltip>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                align="center"
              >
                <Typography>No books found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </TableContainer>
  );
};

export default ReusableTable;
