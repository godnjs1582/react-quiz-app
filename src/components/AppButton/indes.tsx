import { Button } from "@chakra-ui/react";
import React from "react";

interface AppButtonProps {
  value: string;
  colorScheme: string;
  variant: string;
  className?: string;
  disabled?: boolean;
  width?: string;
  onClick: (e?: any) => void;
}

const AppButton: React.FC<AppButtonProps> = ({
  value,
  colorScheme,
  variant,
  className,
  disabled,
  width,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      colorScheme={colorScheme}
      variant={variant}
      className={className}
      isDisabled={disabled}
      w={width}
    >
      {value}
    </Button>
  );
};

export default AppButton;
