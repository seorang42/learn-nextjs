"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });

      document.body.style.overflow = "hidden";
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => {
        document.body.style.overflow = "auto";
        router.back();
      }}
      onClick={(e) => {
        // modal의 배경을 클릭할 경우 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          document.body.style.overflow = "auto";
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
