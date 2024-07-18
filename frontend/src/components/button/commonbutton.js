import { Box} from "@chakra-ui/react";
import React from "react";

const CommonButton = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      color="white"
      fontWeight="400"
      borderRadius="3px"
      sx={{
        backdropFilter: "blur(10px) !important",
        clipPath:
          "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "pink.500",
          clipPath: "polygon(0 100%, 100% 0, 0 0)",
        },
        "::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "20px",
          height: "20px",
          backgroundColor: "pink.500",
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CommonButton;
