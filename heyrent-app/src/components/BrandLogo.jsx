import React from "react";
import { useGetSettings } from "../features/settings/useSettings";

export default function BrandLogo({ showSlogan = true }) {
  const { isLoading, settings } = useGetSettings();

  if (!isLoading)
    return (
      <div>
        <span className="text-4xl brand">{settings.logoName}</span>
        {showSlogan && <p className="text-xs text-right">{settings.slogan}</p>}
      </div>
    );
}
