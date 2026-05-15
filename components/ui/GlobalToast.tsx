"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../features/toast/toastSlice";
import { RootState } from "../../store/store";

export default function GlobalToast() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector(
    (state: RootState) => state.toast
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-6 right-6 px-6 py-3 rounded-2xl shadow-lg font-semibold z-50 ${
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
}