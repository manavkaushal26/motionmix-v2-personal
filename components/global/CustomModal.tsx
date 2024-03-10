"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { useModal } from "../providers/ModalProvider";

type Props = {
  title: string;
  children: ReactNode;
  subTitle?: string;
  defaultOpen?: boolean;
};

const CustomModal = ({
  title,
  subTitle = "",
  defaultOpen = false,
  children,
}: Props) => {
  const { setClose, isOpen } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subTitle ? <DialogDescription>{subTitle}</DialogDescription> : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
