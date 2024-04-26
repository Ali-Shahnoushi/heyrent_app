import React, { useState } from "react";
import { useGetCars } from "./useCars";
import Spinner from "../../components/Spinner";
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
  BiCheck,
  BiDownArrowAlt,
  BiSolidEdit,
  BiSort,
  BiTrash,
  BiUpArrowAlt,
} from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaEye } from "react-icons/fa6";
import { useDeleteCar } from "./useDeleteCar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CarForm from "./CarForm";
import { Link } from "react-router-dom";

const healths = {
  "A+": {
    color: "bg-teal-700",
  },
  A: {
    color: "bg-lime-600",
  },
  B: {
    color: "bg-yellow-500",
  },
  C: {
    color: "bg-orange-500",
  },
};

export default function CarsTable() {
  const [carObject, setCarObject] = useState({});
  const MySwal = withReactContent(Swal);
  const { cars, isLoading, error } = useGetCars();
  const [columnFilters, setColumnFilters] = useState([]);
  const { deleteCar, isDeleting } = useDeleteCar();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const columns = [
    {
      accessorKey: "image",
      header: "تصویر",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-hexagon w-16 h-16">
              <img src={props.getValue()} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "نام",
      size: 300,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <div>
            <div className="brand text-xl font-bold">{props.getValue()}</div>
            <div className="brand text-lg opacity-50">USA</div>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "seat",
      header: "تعداد صندلی‌ها",
      cell: (props) => (
        <div className="flex justify-center">
          <p className="text-2xl">{props.getValue()}</p>,
        </div>
      ),
    },
    {
      accessorKey: "health",
      header: "سلامت خودرو",
      cell: (props) => (
        <div className="flex justify-center">
          <span
            className={`rounded-badge brand font-black text-white w-7 h-7 flex items-center justify-center ${
              healths[props.getValue()].color
            }`}
          >
            {props.getValue()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "gearbox",
      header: "دنده اتوماتیک",
      cell: (props) => (
        <span className="text-xl flex items-center justify-center">
          {props.getValue() ? <BiCheck /> : <IoMdClose />}
        </span>
      ),
    },
    {
      accessorKey: "id",
      enableSorting: false,
      cell: (props) => (
        <span className="flex gap-2">
          <CarForm
            name={`edit-${props.getValue()}`}
            carObject={{ id: props.getValue(), ...props.row.original }}
          />

          <button
            onClick={() => {
              editCarHandle(`edit-${props.getValue()}`);
            }}
            className="btn text-xl text-blue-400 btn-circle"
          >
            <BiSolidEdit />
          </button>
          <button
            className="btn text-xl text-red-500 btn-circle"
            onClick={() => {
              deleteCarHandle(props.getValue());
            }}
          >
            <BiTrash />
          </button>
          <Link to={`/cars/${props.getValue()}`}>
            <button className="btn text-xl text-slate-500 btn-circle">
              <FaEye />
            </button>
          </Link>
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: cars,
    columns,
    state: { columnFilters, pagination },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  function deleteCarHandle(carId) {
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
        deleteCar(carId);
      }
    });
  }

  function editCarHandle(modalID) {
    document.getElementById(modalID).classList.add("modal-open");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl mb-8 font-semibold">لیست ماشین‌ها</h2>
      <div className="flex items-center mb-2">
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
          <CarForm />
          <button
            className="btn btn-primary font-normal btn-md"
            onClick={() =>
              document
                .getElementById("car_form_modal")
                .classList.add("modal-open")
            }
          >
            افزودن خودرو
          </button>
        </div>
      </div>
    </div>
  );
}
