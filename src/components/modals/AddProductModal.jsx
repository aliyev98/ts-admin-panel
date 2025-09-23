import React from 'react'
import { X } from 'lucide-react'

const AddProductModal = () => {
    return (
        <div className='custom-modal add-product-modal'>

            <div className="modal-overlay">

                <div className="modal-dialog">

                    <div className="modal-header">
                        <button type="button" className="modal-close" onClick={onClose} aria-label="Kapat"><X /></button>
                    </div>

                    <div className="modal-body">

                    </div>

                    <div className="modal-footer">

                    </div>

                </div>

            </div>


        </div>
    )
}

export default AddProductModal


// // AddProductModal.jsx
// import React, { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";

// const AddProductModal = ({ open, onClose, title = "Yeni Məhsul", children }) => {
//   const overlayRef = useRef(null);
//   const dialogRef = useRef(null);
//   const titleId = "add-product-modal-title";

//   // ESC ile kapat
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   if (!open) return null;

//   const content = (
//     <div
//       className="modal-overlay"
//       ref={overlayRef}
//       onMouseDown={(e) => {
//         // sadece overlay'e tıklanınca kapat (dialog içine tıklamaları yoksay)
//         if (e.target === overlayRef.current) onClose?.();
//       }}
//     >
//       <div
//         className="modal-dialog"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby={titleId}
//         ref={dialogRef}
//       >
//         <div className="modal-header">
//           <h3 id={titleId}>{title}</h3>
//           <button type="button" className="modal-close" onClick={onClose} aria-label="Kapat">×</button>
//         </div>

//         <div className="modal-body">
//           {children}
//         </div>

//         <div className="modal-footer">
//           <button className="btn" onClick={onClose}>Vazgeç</button>
//           <button className="btn btn-primary">Kaydet</button>
//         </div>
//       </div>
//     </div>
//   );

//   // Portal varsa index.html'e <div id="modal-root"></div> ekleyip buraya render et
//   const root = document.getElementById("modal-root");
//   return root ? createPortal(content, root) : content;
// };

// export default AddProductModal;