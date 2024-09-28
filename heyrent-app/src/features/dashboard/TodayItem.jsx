import { Link } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";

export default function TodayItem({ activity }) {
  const { id, status, customer_name, daysCount } = activity;

  console.log(activity);

  return (
    <div className="grid grid-cols-[7rem_7rem_4rem_7rem_6rem] gap-3 items-center text-sm py-2 border-b border-gray-200">
      {status === "unconfirmed" && (
        <span className="badge badge-lg badge-accent">ثبت شده</span>
      )}
      {status === "paid" && (
        <span className="badge badge-lg badge-info">پرداخت شده</span>
      )}

      <div>{customer_name}</div>
      <div>{daysCount.toLocaleString("fa-IR")} روز</div>

      {status === "unconfirmed" && (
        <Link to={`/rents/${id}`} size="sm" varitaion="primary">
          <button className="btn btn-sm btn-warning font-light">
            پرداخت اجاره
          </button>
        </Link>
      )}

      {status === "paid" && <CheckoutButton rentId={id} />}
    </div>
  );
}
