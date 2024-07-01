import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableFilter from "../../components/TableFilter";
import { BiDownArrowAlt, BiSort, BiTrash, BiUpArrowAlt } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight, FaEye } from "react-icons/fa6";
import { useGetRents } from "./useRents";
import { useDeleteRent } from "./useDeleteRent";
import { Link } from "react-router-dom";
import RentForm from "./RentForm";

export default function CouponTable() {
  const MySwal = withReactContent(Swal);

  const { error, isLoading, rents } = useGetRents();
  const [columnFilters, setColumnFilters] = useState([]);
  const { deleteRent, isDeleting } = useDeleteRent();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    {
      accessorKey: "customer_name",
      header: "نام اجاره‌گیرنده",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div>{props.getValue() || "-"}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "وضعیت اجاره",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div>
              {props.getValue() === "unconfirmed" ? (
                <div className="badge badge-error">تایید نشده</div>
              ) : props.getValue() === "checked" ? (
                <div className="badge badge-accent">تایید شده</div>
              ) : props.getValue() === "paid" ? (
                <div className="badge badge-warning">پرداخت شده</div>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "daysCount",
      header: "تعداد روز اجاره",
      size: 200,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="text-lg">
              {props.getValue().toLocaleString("fa-IR") || "-"}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "customer_phone",
      header: "شماره تماس گیرنده",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="text-lg">
              {props.getValue().toLocaleString("fa") || "-"}
            </div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "carId",
      header: "شناسه خودرو",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3 ">
          <div>
            <div>
              <Link className="text-lg" to={`/cars/${props.getValue()}`}>
                {props.getValue().toLocaleString("fa-IR")}
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "",
      enableSorting: false,
      cell: (props) => (
        <span className="flex gap-2">
          <RentForm />

          <Link
            to={`/rents/${props.getValue()}`}
            className="btn text-xl text-slate-500 btn-circle"
          >
            <FaEye />
          </Link>
          <button
            className="btn text-xl text-red-500 btn-circle"
            onClick={() => {
              deleteRentHandle(props.getValue());
            }}
          >
            <BiTrash />
          </button>
        </span>
      ),
    },
  ];

  console.log(rents);

  const table = useReactTable({
    data: rents,
    columns,
    state: { columnFilters, pagination },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  function deleteRentHandle(rentId) {
    MySwal.fire({
      title: "آیا از حذف مطمئنید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0fb098",
      cancelButtonColor: "#c33c3c",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "بیخیال",
      background: "var(--fallback-b1,oklch(var(--b1)/1))",
      color: "var(--fallback-bc,oklch(var(--bc)/1))",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRent(rentId);
      }
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-8 font-semibold">لیست اجاره‌ها</h2>
      <div className="flex items-center mb-2">
        <TableFilter
          field="customer_name"
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th style={{ width: 0 }}>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th style={{ width: header.getSize() }} key={header.id}>
                  <span
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-[16px] flex gap-2 cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && <BiSort />}
                    {
                      { asc: <BiUpArrowAlt />, desc: <BiDownArrowAlt /> }[
                        header.column.getIsSorted()
                      ]
                    }
                  </span>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-start items-center gap-4 mt-2">
        <div className="flex flex-col items-center gap-2 w-[100px]">
          <p>
            صفحه{" "}
            {(table.getState().pagination.pageIndex + 1).toLocaleString(
              "fa-IR"
            )}{" "}
            از {table.getPageCount().toLocaleString("fa-IR")}
          </p>
          {table.getPageCount() > 1 && (
            <span className="flex gap-3">
              <button
                className="p-4"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <FaAngleRight />
              </button>
              <button
                className="p-4"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <FaAngleLeft />
              </button>
            </span>
          )}
        </div>
        <div className="my-2">
          <RentForm />
          <button
            className="btn btn-primary font-normal btn-md"
            onClick={() => document.getElementById("rent_modal").showModal()}
          >
            افزودن اجاره
          </button>
        </div>
      </div>
    </div>
  );
}
