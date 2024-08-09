"use client";

import * as React from "react";
import { FC } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface SupportButtonDrawerProps {
  locales: {
    title: string;
    description: string;
    donate: string;
    cancel: string;
  };
  children: React.ReactNode;
}

const PAY_PAL_DONATION_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=H7MVJ3SLZ4HEA";

export const SupportButtonDrawer: FC<SupportButtonDrawerProps> = ({
  children,
  locales,
}) => {
  const { title, description, donate, cancel } = locales;

  const handleDonate = () => {
    if (typeof window !== "undefined") {
      window.open(PAY_PAL_DONATION_LINK, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <table cellPadding="10" cellSpacing="0" align="center">
              <tbody>
                <tr>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">
                    <img
                      src="https://www.paypalobjects.com/webstatic/de_DE/i/de-pp-logo-200px.png"
                      alt="PayPal Logo"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <DrawerFooter>
            <Button onClick={handleDonate}>{donate}</Button>
            <DrawerClose asChild>
              <Button variant="outline">{cancel}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
