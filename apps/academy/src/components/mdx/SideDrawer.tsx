import { useState } from "react";
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTrigger } from "ui";

export interface SideDrawerProps {
  buttonText: string;
  title?: string;
  children: React.ReactNode;
}

const SideDrawer = (props: SideDrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };

  const { buttonText, title } = props;
  const drawerTitle = title !== undefined ? title : buttonText;

  return (
    <>
      <Button
        onClick={onOpen}
        aria-label="Open Drawer"
        // variant="ghost"
        className={`mt-4 break-words bg-gray-700 text-sm font-bold h-[${
          buttonText.length > 30 ? "3.75rem" : "2.5rem"
        }`}
        // height={[`${buttonText.length > 30 ? "3.75rem" : "2.5rem"}`, "2.5rem"]}
        // style={{
        //   wordWrap: "break-word",
        // }}
        // rightIcon={<ArrowRightIcon />}
      >
        {buttonText}
      </Button>
      <Drawer open={isOpen} /* placement="right" */ onClose={onClose} /* size="xl" */>
        <DrawerOverlay
          className="h-screen" /* backdropFilter="auto" backdropInvert="10%" backdropBlur="3px" */
        />
        <DrawerContent className="bg-[#00000f] px-4 pb-8">
          <DrawerTrigger
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          <DrawerHeader className="bg-yellow-300 text-3xl">{drawerTitle}</DrawerHeader>
          <DrawerContent>{props.children}</DrawerContent>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
