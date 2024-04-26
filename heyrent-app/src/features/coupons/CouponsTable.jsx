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
import {
  BiDownArrowAlt,
  BiSolidEdit,
  BiSort,
  BiTrash,
  BiUpArrowAlt,
} from "react-icons/bi";
import { FaAngleLeft, FaAngleRight, FaEye } from "react-icons/fa6";
import { useGetCoupons } from "./useCoupons";
import { Link } from "react-router-dom";
import { useDeleteCoupon } from "./useDeleteCoupon";
import CouponForm from "./CouponForm";

export default function CouponTable() {
  const MySwal = withReactContent(Swal);
  const { isLoading, error, coupons } = useGetCoupons();
  const [columnFilters, setColumnFilters] = useState([]);
  const { deleteCoupon, isDeleting } = useDeleteCoupon();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    {
      accessorKey: "name",
      header: "کد تخفیف",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="font-[iranyekan] font-normal">
              {props.getValue()}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "expireDate",
      header: "تاریخ انقضا",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="brand font-bold">{props.getValue()}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "توضیحات",
      enableSorting: false,
      size: 200,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div className="tooltip" data-tip={props.getValue()}>
            <div className="cursor-help w-80 whitespace-nowrap overflow-hidden overflow-ellipsis">
              {props.getValue() || "-"}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "مقدار تخفیف",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="brand font-bold">{props.getValue() || "-"}</div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "percent",
      header: "درصد تخفیف",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="brand font-bold">{props.getValue() || "-"}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      enableSorting: false,
      cell: (props) => (
        <span className="flex gap-2">
          <CouponForm
            name={`edit-${props.getValue()}`}
            couponObject={{ id: props.getValue(), ...props.row.original }}
          />

          <button
            onClick={() => {
              editCouponHandle(`edit-${props.getValue()}`);
            }}
            className="btn text-xl text-blue-400 btn-circle"
          >
            <BiSolidEdit />
          </button>
          <button
            className="btn text-xl text-red-500 btn-circle"
            onClick={() => {
              deleteCouponHandle(props.getValue());
              console.log(props.getValue());
            }}
          >
            <BiTrash />
          </button>
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: coupons,
    columns,
    state: { columnFilters, pagination },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  function deleteCouponHandle(couponId) {
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
        deleteCoupon(couponId);
      }
    });
  }

  function editCouponHandle(modalID) {
    document.getElementById(modalID).classList.add("modal-open");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-8 font-semibold">لیست تخفیف‌ها</h2>
      <div className="flex items-center">
        <TableFilter
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
            صفحه {table.getState().pagination.pageIndex + 1} از{" "}
            {table.getPageCount()}
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
          <CouponForm />
          <button
            className="btn btn-primary font-normal btn-md"
            onClick={() =>
              document
                .getElementById("coupon_form_modal")
                .classList.add("modal-open")
            }
          >
            افزودن کوپن تخفیف
          </button>
        </div>
      </div>
    </div>
  );
}
