import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({children, open, className='', onClose}) {
  const dailog = useRef();

  useEffect(() => {
    const obj = dailog.current;
    if (open) {
      obj?.showModal();
    }
    return () => obj?.close();
  }, [open]);  

  return createPortal(
    <dialog open ref={dailog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>
    , document.getElementById('modal'))
};

export default Modal;