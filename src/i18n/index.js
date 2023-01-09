import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const I18n = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    i18n.changeLanguage(lang || "en");
  }, []);
  return <></>;
};

export default I18n;
