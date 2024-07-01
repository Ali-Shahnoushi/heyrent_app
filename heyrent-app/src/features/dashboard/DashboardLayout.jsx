import Spinner from "../../components/Spinner";
import { useGetCars } from "../cars/useCars";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "./TodayActivity";
import { useRecentRents } from "./useRecentRents";
import { useRecentStays } from "./useRecentStays";

export default function DashboardLayout() {
  const { isLoading: isLoadingRents, rents } = useRecentRents();

  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cars, isLoading: isLoadingCars } = useGetCars();

  if (isLoadingRents || isLoadingStays || isLoadingCars) return <Spinner />;
  return (
    <div className="grid grid-cols-4 grid-rows-[auto_20rem_auto] gap-[2.4rem]">
      <Stats
        rents={rents}
        numDays={numDays}
        carCount={cars.length}
        confirmedStays={confirmedStays}
      />
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart daysCount={numDays} rents={rents} />
    </div>
  );
}
