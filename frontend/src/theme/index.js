import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#0E001F",
        color: "white",
      },
    },
  },
});

export default customTheme;
