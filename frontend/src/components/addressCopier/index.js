import {
  Flex,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdOutlineContentCopy } from "react-icons/md";
import { addressShortener } from "../../utils";

export const AddressCopier = ({
  address,
  truncated = true,

  fontWeight,
  style,
}) => {
  const handleCopy = (label, text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Flex
        cursor="pointer"
        alignItems="center"
        color={"black"}
        onClick={() => handleCopy("Address", address)}
        _hover={{ color: "text.2" }}
        sx={{ fontWeight: fontWeight || "bold", color: "#F7F7F8" }}
        style={style}
      >
        <Text mr="4px" color={"black"}>
          {truncated ? addressShortener(address) : address}
        </Text>
        <MdOutlineContentCopy color="black" w="24px" h="21px" />
      </Flex>
    </>
  );
};
