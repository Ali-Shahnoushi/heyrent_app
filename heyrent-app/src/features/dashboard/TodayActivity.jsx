import Spinner from "../../components/Spinner";
import TodayItem from "./TodayItem.jsx";
import { useTodayActivity } from "./useTodayActivity.js";

export default function TodayActivity() {
  const { isLoading, stays } = useTodayActivity();

  console.log(stays);

  return (
    <div className="border border-gray-500 rounded-md p-8 flex flex-col gap-10 py-6 col-span-2">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl font-medium mb-3">فعالیت های امروز</h2>
        {!isLoading ? (
          stays?.length > 0 ? (
            <div
              id="activity_wrapper"
              className="overflow-x-hidden overflow-scroll"
            >
              {stays.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </div>
          ) : (
            <h3 className="self-center mt-14 text-xl">
              فعالیتی امروز وجود نداشته...
            </h3>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
