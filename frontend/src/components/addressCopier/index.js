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
import toast from "react-hot-toast";

export const AddressCopier = ({
  address,
  truncated = true,
  fontWeight,
  style,
  fontSize,
}) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
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
        <Text mr="4px" fontSize={fontSize}>
          {truncated ? addressShortener(address) : address}
        </Text>
        <MdOutlineContentCopy size={"24px"} />
      </Flex>
    </>
  );
};
