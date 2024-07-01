import React from "react";
import Filter from "../../components/Filter";

export default function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "۷ روز گذشته" },
        { value: "30", label: "۳۰ روز گذشته" },
        { value: "90", label: "۹۰ روز گذشته" },
      ]}
    />
  );
}
