import React from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, useRowSelect } from "react-table";
import { TextInput, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "@tremor/react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";

const Planilla = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Categoría",
        accessor: "category",
      },
      {
        Header: "Comuna",
        accessor: "commune",
      },
      {
        Header: "Estación del año",
        accessor: "season",
      },
      {
        Header: "Tonalidad",
        accessor: "categoryName",
      },
      {
        Header: "NCS",
        columns: [
          {
            Header: "Nuance",
            accessor: "NcsNuance",
          },
          {
            Header: "Hue",
            accessor: "NcsHue",
          },
        ],
      },
      {
        Header: "MUNSELL",
        columns: [
          {
            Header: "Munsell page",
            accessor: "MunsellPage",
          },
          {
            Header: "Hue", //Duplicado
            accessor: "MunsellHue",
          },
          {
            Header: "Value",
            accessor: "MunsellValue",
          },
          {
            Header: "Chroma",
            accessor: "MunsellChroma",
          },
          {
            Header: "Nombre código Munsell",
            accessor: "MunsellName",
          },
        ],
      },
      {
        Header: "CIELAB",
        columns: [
          {
            Header: "L*",
            accessor: "L*",
          },
          {
            Header: "a*",
            accessor: "A*",
          },
          {
            Header: "b*",
            accessor: "B*",
          },
        ],
      },
      {
        Header: "RGB",
        columns: [
          {
            Header: "R",
            accessor: "R",
          },
          {
            Header: "G",
            accessor: "G",
          },
          {
            Header: "B",
            accessor: "B",
          },
        ],
      },
      {
        Header: "CMYK",
        columns: [
          {
            Header: "C",
            accessor: "C",
          },
          {
            Header: "M",
            accessor: "M",
          },
          {
            Header: "Y",
            accessor: "Y",
          },
          {
            Header: "K",
            accessor: "K",
          },
        ],
      },
      {
        Header: "Código PINTURA",
        accessor: "Ceresita",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter, selectedFlatRows } =
    useTable(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <input type="checkbox" {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );

  // Función para exportar a CSV
  const csvData = selectedFlatRows.map((d) => {
    const row = {};
    columns.forEach((column) => {
      if (column.columns) {
        // Columnas anidadas
        column.columns.forEach((subColumn) => {
          row[subColumn.Header] = d.original[subColumn.accessor];
        });
      } else {
        // Columna principal
        row[column.Header] = d.original[column.accessor];
      }
    });
    return row;
  });

  // Encabezados para el CSV
  const csvHeaders = [];
  columns.forEach((column) => {
    if (column.columns) {
      // Columnas anidadas
      column.columns.forEach((subColumn) => {
        csvHeaders.push({
          label: subColumn.Header,
          key: subColumn.Header,
        });
      });
    } else {
      // Columna principal
      csvHeaders.push({ label: column.Header, key: column.Header });
    }
  });

  // Función para exportar a PDF
  const exportToPdf = () => {
    const doc = new jsPDF({
      format: "a2",
      orientation: "landscape",
    });
    const filteredData = selectedFlatRows.map((d) => d.original);

    const flattenedData = filteredData.map((row) => {
      const flatRow = {};

      columns.forEach((column) => {
        if (column.columns) {
          // Columnas anidadas
          column.columns.forEach((subColumn) => {
            flatRow[subColumn.Header] = row[subColumn.accessor];
          });
        } else {
          // Columna principal
          flatRow[column.Header] = row[column.accessor];
        }
      });

      return flatRow;
    });

    const columnsData = columns.reduce((acc, column) => {
      if (column.columns) {
        // Columnas anidadas
        return acc.concat(column.columns.map((subColumn) => subColumn.Header));
      }
      // Columna principal
      return acc.concat(column.Header);
    }, []);

    const tableData = flattenedData.map((row) => columnsData.map((col) => row[col]));

    const columnWidths = Array(columnsData.length).fill(20);

    doc.autoTable({
      head: [columnsData],
      body: tableData,
      styles: {
        fontSize: 9,
        overflow: "linebreak",
        cellPadding: 2,
      },
      columnStyles: columnWidths.map((width) => ({
        columnWidth: width,
      })),
    });

    doc.save("Datos.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = (data, columns) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Define las columnas y sus encabezados
    const excelColumns = [];
    columns.forEach((column) => {
      if (column.columns) {
        // Si hay columnas anidadas, agrega cada una con su encabezado
        column.columns.forEach((subColumn) => {
          excelColumns.push({
            header: subColumn.Header,
            key: subColumn.accessor,
            width: 20,
          });
        });
      } else {
        // Si no hay columnas anidadas, agrega la columna principal
        excelColumns.push({
          header: column.Header,
          key: column.accessor,
          width: 20,
        });
      }
    });
    worksheet.columns = excelColumns;

    // Agrega los datos
    data.forEach((row) => {
      const rowData = {};
      columns.forEach((column) => {
        if (column.columns) {
          // Si hay columnas anidadas, agrega los datos correspondientes
          column.columns.forEach((subColumn) => {
            rowData[subColumn.accessor] = row[subColumn.accessor];
          });
        } else {
          // Si no hay columnas anidadas, agrega los datos de la columna principal
          rowData[column.accessor] = row[column.accessor];
        }
      });
      worksheet.addRow(rowData);
    });

    // Crea un blob con el contenido del archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
    });
  };

  return (
    <div className="planilla-container p-4">
      <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-between mb-4">
        <TextInput
          value={state.globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Filtrar datos..."
          className="sm:w-1/4 md:w-1/3 lg:w-1/2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 shadow-md text-gray-700"
        />
        <div className="flex mt-2 sm:mt-0 items-stretch flex-col flex-wrap sm:flex-nowrap sm:flex-row sm:ml-2 ml-0 gap-2 justify-between sm:items-center">
          <CSVLink data={csvData} headers={csvHeaders} filename={"data.csv"}>
            <button className="w-full flex items-center h-12 space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Exportar a CSV
            </button>
          </CSVLink>
          <button
            onClick={exportToPdf}
            className="flex items-center h-12 space-x-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Exportar a PDF
          </button>
          <button
            onClick={() => exportToExcel(data, columns)}
            className="flex items-center h-12 space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Exportar a Excel
          </button>
        </div>
      </div>
      <div className="max-h-[75vh] overflow-y-auto shadow-sm rounded-md">
        <Table {...getTableProps()} className="w-full table">
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
            className="bg-[#F9FAFB] dark:bg-dark-tremor-background-subtle shadow-sm"
          >
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeaderCell {...column.getHeaderProps(column.getSortByToggleProps())} className="p-3">
                    <div className="flex items-center justify-center">
                      {column.isSorted ? ( //Si la columna está ordenada
                        <>
                          {column.render("Header")}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={column.isSortedDesc ? "M8 9l4-4 4 4" : "M8 15l4 4 4-4"}
                            />
                          </svg>
                        </>
                      ) : (
                        column.render("Header")
                      )}
                    </div>
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-3">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Planilla;
