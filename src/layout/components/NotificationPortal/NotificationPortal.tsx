import { type ReactNode } from "react";
import { createPortal } from "react-dom";

import style from "./style.module.css";

/*
 * NotificationPortal — monta las notificaciones dentro del div#noti
 * (definido en index.html) usando un portal de React, para que floten
 * sobre toda la app sin heredar estilos del layout.
 */
function NotificationPortal({ children }: { children: ReactNode }) {

  

  return createPortal(
    <div className={style.notiPortal}>
      {children}
    </div>,
    document.getElementById("noti")!
  );
}

export { NotificationPortal };
