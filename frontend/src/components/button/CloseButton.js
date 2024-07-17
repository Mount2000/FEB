import React from "react";
import { Button } from "@chakra-ui/react";

const CloseButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      {...props}
      bg="pink.500"
      color="white"
      fontWeight="400"
      fontSize={"20px"}
      position="relative"
      borderRadius="0px"
      w={"60px"}
      h={"60px"}
      sx={{
        clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0, 
          left: 0,
          width: "20px",
          height: "20px",
          clipPath: "polygon(0 100%, 100% 0, 0 0)",
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "20px",
          height: "20px",
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",  // Điều chỉnh clip-path cho góc dưới
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CloseButton;
