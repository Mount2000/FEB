import React from "react";
import { Button } from "@chakra-ui/react";

const ActionButton = ({ children, onClick, bgColor, textColor, ...props }) => {
  return (
    <Button
      {...props}
      bg={bgColor ? bgColor : "pink.500"}
      color="white"
      fontWeight="400"
      fontSize={"20px"}
      position="relative"
      borderRadius="0px"
      h={"60px"}
      sx={{
        clipPath:
          "polygon(0 16px, 16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "16px",
          height: "16px",
          clipPath: "polygon(0 100%, 100% 0, 0 0)",
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "16px",
          height: "16px",
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
