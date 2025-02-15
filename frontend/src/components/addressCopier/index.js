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
import useScreenWidth from "../../hooks/useScreenWidth";

export const AddressCopier = ({
  address,
  truncated = true,
  fontWeight,
  style,
  fontSize,
  digits = 5,
}) => {
  const handleCopy = (label, text) => {
    toast.success(`${label} copied!`);
    navigator.clipboard.writeText(text);
  };

  const isMobile = useScreenWidth(480);
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
          {truncated ? addressShortener(address, digits) : address}
        </Text>
        <MdOutlineContentCopy size={isMobile ? "12px" : "24px"} />
      </Flex>
    </>
  );
};
