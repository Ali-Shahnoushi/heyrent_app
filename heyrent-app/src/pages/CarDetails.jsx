import { useNavigate } from "react-router-dom";
import { useCar } from "../features/cars/useCar";
import Spinner from "../components/Spinner";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import {
  MdAirlineSeatReclineNormal,
  MdHealthAndSafety,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import CarItem from "../components/CarItem";
import { useDeleteCar } from "../features/cars/useDeleteCar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CarDetails() {
  const { deleteCar, isDeleting } = useDeleteCar();
  const { car, isLoading } = useCar();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  if (isLoading || isDeleting) return <Spinner />;

  const {
    deposit,
    name,
    pricePerDay,
    seat,
    tank,
    doors,
    description,
    image,
    health,
    gearbox,
    id: carID,
  } = car;

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
        navigate('/cars');
      }
    });
  }

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm font-normal mb-4"
              onClick={() => {
                navigate(-1);
              }}
            >
              بازگشت
            </button>
            <button
              className="btn btn-outline btn-error btn-sm font-normal mb-4"
              onClick={() => {
                deleteCarHandle(carID);
              }}
            >
              حذف خودرو
            </button>
          </div>
          <h2 className="text-5xl capitalize">{name}</h2>
          <div className="flex py-5 flex-col gap-6">
            <CarItem
              icon={<FaRegMoneyBillAlt />}
              label="قیمت اجاره روزانه"
              value={pricePerDay}
            />
            <CarItem
              icon={<MdOutlineAttachMoney />}
              label="مبلغ وثیقه"
              value={deposit}
            />
            <CarItem
              icon={<MdAirlineSeatReclineNormal />}
              label="تعداد صندلی"
              value={seat}
            />
            <CarItem icon={<GiCarDoor />} label="تعداد درب‌ها" value={doors} />
            <CarItem icon={<FaGasPump />} label={"ظرفیت باک"} value={tank} />
            <CarItem
              itemType="health"
              icon={<MdHealthAndSafety />}
              label="سلامت خودرو"
              value={health}
            />
            <CarItem
              itemType="gearbox"
              icon={<TbAutomaticGearbox />}
              label="دنده اتوماتیک"
              value={gearbox}
            />
          </div>
        </div>
        <img
          src={image}
          alt={name}
          className="w-1/2 h-auto rounded-md object-cover"
        />
      </div>
      <div>
        <p className="leading-7 mt-4">{description}</p>
      </div>
    </div>
  );
}
