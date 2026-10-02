import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

const Portal = ({ children }: PortalProps) => {
  return createPortal(children, document.body);
};

export { Portal };