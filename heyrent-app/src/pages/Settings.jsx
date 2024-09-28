import React, { useEffect } from "react";
import SettingsForm from "../features/settings/SettingsForm";

export default function Settings() {
  useEffect(() => {
    document.title = `Settings | HEYRENT!`;
  }, []);
  return <SettingsForm />;
}
