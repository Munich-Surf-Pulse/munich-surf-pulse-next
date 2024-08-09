import * as React from "react";
import { HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getI18n } from "@/locales/server";
import { SupportButtonDrawer } from "@/components/common/SupportButton/SupportButtonDrawer";

export const SupportButton = async () => {
  const t = await getI18n();

  return (
    <SupportButtonDrawer
      locales={{
        title: t("support.title"),
        description: t("support.description"),
        donate: t("actions.donate"),
        cancel: t("actions.cancel"),
      }}
    >
      <Button variant="ghost" className={"px-0"}>
        <HeartHandshake className={"mr-2"} /> Support
      </Button>
    </SupportButtonDrawer>
  );
};
