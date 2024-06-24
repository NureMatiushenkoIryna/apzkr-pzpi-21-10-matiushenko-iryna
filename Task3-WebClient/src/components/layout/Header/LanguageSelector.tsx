import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { APP_LANGUAGES } from "../../../utils/constants";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  return (
    <Select
      data={APP_LANGUAGES}
      value={i18n.language}
      onChange={(locale) => {
        if (locale) {
          i18n.changeLanguage(locale);
        }
      }}
    />
  );
};
