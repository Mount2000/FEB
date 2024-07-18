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
  // fonts: {
  //   heading: `'Bruno Ace SC Regular', sans-serif`,
  //   body: `'Bruno Ace SC Regular', sans-serif`,
  // },
});

export default customTheme;
