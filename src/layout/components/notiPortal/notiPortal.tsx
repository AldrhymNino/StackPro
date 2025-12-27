import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import style from "./style.module.css";

function Modal({ children }: { children: ReactNode }) {
  return createPortal(
    <div className={style.notiPortal}>
      {children}
    </div>,
    document.getElementById("noti")!
  );
}
export default Modal;