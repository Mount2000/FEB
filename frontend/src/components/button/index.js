import React from "react";
import { Button } from "@chakra-ui/react";

const CustomButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      {...props}
      // bg="pink.500"
      color="white"
      fontWeight="400"
      fontFamily={`'Inter', sans-serif`}
      fontSize={"20px"}
      position="relative"
      borderRadius="3px"
      height={"60px"}
      sx={{
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        "::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "20px",
          height: "20px",
          // backgroundColor: "pink.500",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        },
        "::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "20px",
          height: "20px",
          // backgroundColor: "pink.500",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        },
      }}
      minWidth={"max-content"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
