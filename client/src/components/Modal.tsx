import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { ReactSVG } from "react-svg";
import { ModalHandle } from "../types/types";
import styles from "../components/Modal.module.css";
import close_icon from "../assets/close.svg";
type ModalProps = {
  title: string;
  body: string;
  CTA: JSX.Element;
};
const Modal = forwardRef<ModalHandle, ModalProps>(({ title, body, CTA }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      open() {
        dialogRef.current?.showModal();
      },
      close() {
        dialogRef.current?.close();
      },
    }));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dialogRef.current?.close();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) dialogRef.current?.close()
    }
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown, true);
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true);
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }, [handleKeyDown, handleClickOutside]);
    return createPortal(
      <dialog ref={dialogRef} style={{ border: 'none' }}>
        <div className={styles.modal_wrapper}>
          <div
            ref={contentRef}
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>{title}</h2>
              <button
                className={styles.close_btn}
                onClick={() => dialogRef.current?.close()}
              >
                <ReactSVG className={styles.close_icon} src={close_icon} />
              </button>
            </div>
            <div className={styles.modal_body}>
              <p>{body}</p>
            </div>
            <div className={styles.modal_footer}>{CTA}</div>
          </div>
        </div>
      </dialog>, document.getElementById('modal') as HTMLElement
    );
  }
);
export default Modal;