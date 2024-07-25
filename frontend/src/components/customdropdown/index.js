import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import iconReferral from "../../assets/img/node/icon-referral-node.png";

const CustomSelect = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon color="white" />}
        width={"20%"}
        backgroundColor={"#231A2E"}
        border="1px solid #FCDDEC"
      >
        <Flex alignItems="center">
          <Image src={iconReferral} boxSize="20px" mr="10px" />
          <Box color={"#FFF"}>Ethereum</Box>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Flex alignItems="center">
            <Image src={iconReferral} boxSize="20px" mr="10px" />
            <Box>Ethereum</Box>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CustomSelect;
