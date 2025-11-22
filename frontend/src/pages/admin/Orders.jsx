// File: src/pages/admin/Orders.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../app/features/order/orderSlice";
import Skeleton from "../../components/common/Skeleton";

/**
 * Status -> badge classes
 */
const statusClasses = {
  requested: "text-yellow-500",
  accepted: "text-indigo-500",
  "in-progress": "text-blue-500",
  completed: "text-green-500",
  cancelled: "text-red-500",
};

/**
 * Modal: full details (keeps brief here)
 */
function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
  if (!order) return null;
  const attachments = order.attachments || [];

  return (
    <div className="fixed inset-0 p-5 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-bg/50" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-4xl bg-cardBg rounded-lg shadow-lg 
        overflow-auto max-h-[90vh] p-5 md:p-10
        scrollbar-thin scrollbar-track-cardBg scrollbar-thumb-hoverCardBg"
      >
        <div className="border-b pb-5 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Order — {order._id}</h2>
            <p className="text-sm text-mutedText mt-1">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-mutedText hover:text-text cursor-pointer"
          >
            Close ✕
          </button>
        </div>

        <div className="pt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h3 className="text-sm text-mutedText">Client</h3>
              <p className="font-medium">{order.fullname}</p>
              <p className="text-sm text-mutedText">{order.emailAddress}</p>
              <p className="text-sm text-mutedText">{order.phoneNumber}</p>
            </div>

            <div>
              <h3 className="text-sm text-mutedText">Project</h3>
              <p className="font-medium">{order.projectType}</p>
              <p className="text-sm text-mutedText">{order.budgetRange}</p>
              <p className="text-sm text-mutedText">
                Deadline:{" "}
                {order.projectDeadline
                  ? new Date(order.projectDeadline).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-mutedText">Brief</h3>
            <p className="text-sm text-text whitespace-pre-wrap">
              {order.projectBrief}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-mutedText">
              Attachments ({attachments.length})
            </h3>
            {attachments.length === 0 ? (
              <p className="text-sm text-mutedText">No attachments</p>
            ) : (
              <ul className="flex flex-wrap gap-2 mt-2">
                {attachments.map((a, i) => (
                  <li key={i} className="text-sm">
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-primary"
                      >
                        {a.filename || `file-${i + 1}`}
                      </a>
                    ) : (
                      <span className="text-mutedText">
                        {a.filename || `file-${i + 1}`}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm text-mutedText">Status</h3>
              <div
                className={`inline-block py-1 rounded-full text-sm ${
                  statusClasses[order.status]
                }`}
              >
                {order.status}
              </div>
            </div>

            <div className="ml-auto">
              <label className="block text-sm text-mutedText mb-1">
                Update status
              </label>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                className="border border-border px-3 py-1 rounded bg-hoverCardBg text-text 
                  focus:outline-none"
              >
                {[
                  "requested",
                  "accepted",
                  "in-progress",
                  "completed",
                  "cancelled",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Row: compact, no brief text
 */
function OrderRow({ order, onOpen }) {
  // simple avatar: initials or fallback
  const initials = (order.fullname || order.emailAddress || "U")
    .split(" ")
    .map(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const attachmentsCount = order.attachments?.length || 0;

  return (
    <button
      onClick={() => onOpen(order)}
      className="w-full text-left p-3 rounded-lg hover:shadow-sm transition bg-cardBg border border-border flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-hoverCardBg flex items-center justify-center overflow-hidden">
        {order.attachments?.[0]?.url ? (
          <img
            src={order.attachments[0].url}
            alt="attachment"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-mutedText">
            {initials}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <div className="font-medium truncate">{order.fullname}</div>
            <div className="text-sm text-mutedText truncate">
              {order.emailAddress}
            </div>
          </div>

          <div className="text-right">
            <div
              className={`inline-block text-sm py-1 rounded-full ${
                statusClasses[order.status]
              }`}
            >
              {order.status}
            </div>
            <div className="text-xs text-mutedText mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm text-mutedText">
          <div>{order.projectType}</div>
          <div className="px-2 py-0.5 border rounded">{order.budgetRange}</div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-mutedText"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 7h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 7v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{attachmentsCount}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

/**
 * Main Orders page
 */
const Orders = () => {
  const dispatch = useDispatch();
  const {
    allOrders = [],
    allStatus,
    allError,
  } = useSelector((s) => s.order || {});

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const openOrder = (order) => setSelected(order);
  const closeOrder = () => setSelected(null);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateOrderStatus({ id, statusData: { status } }));
    setSelected((prev) => (prev ? { ...prev, status } : prev));
  };

  if (allStatus === "loading")
    return (
      <div className="min-h-[300px] flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg">
            <Skeleton width="100%" height="180px" rounded />
            <Skeleton width="80%" height="20px" className="mt-4" />
            <Skeleton width="60%" height="20px" className="mt-2" />
          </div>
        ))}
      </div>
    );
  if (allError) return <div className="p-4 text-danger">{allError}</div>;

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>

        <div
          className="inline-flex items-center gap-3 text-sm text-mutedText"
          aria-hidden="true"
        >
          <span className="text-mutedText">Total:</span>
          <span className="px-3 py-1 rounded-full bg-hoverCardBg text-sm font-medium">
            {allOrders?.length ?? 0}
          </span>
        </div>
      </div>

      {allOrders.length === 0 ? (
        <p className="text-mutedText">No orders found.</p>
      ) : (
        <div className="grid gap-3">
          {allOrders.map((o) => (
            <OrderRow key={o._id} order={o} onOpen={openOrder} />
          ))}
        </div>
      )}

      {selected && (
        <OrderDetailsModal
          order={selected}
          onClose={closeOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default Orders;
