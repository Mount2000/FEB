import { Box, Button } from "@chakra-ui/react";
import React from "react";

const CommonButton = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      color="white"
      fontWeight="400"
      borderRadius="3px"
      sx={{
        clipPath:
          "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0, // Điều chỉnh từ bottom lên top
          left: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "pink.500",
          clipPath: "polygon(0 100%, 100% 0, 0 0)", // Điều chỉnh clip-path cho góc trên
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: 0, // Điều chỉnh từ top xuống bottom
          right: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "pink.500",
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)", // Điều chỉnh clip-path cho góc dưới
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CommonButton;
