import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

type Props = {
  value: string;
  colorMap: Record<string, string>;
};

export const Mark = ({ value, colorMap }: Props) => {
  const { t } = useTranslation();
  return (
    <Button
      bg={colorMap[value]}
      color={colorMap[value]}
      autoContrast
      style={{
        pointerEvents: "none",
      }}
    >
      {t(value)}
    </Button>
  );
};
