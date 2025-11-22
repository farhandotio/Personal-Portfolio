import React from "react";

const UserOrders = ({ orders = [], status }) => {
  if (status === "loading")
    return <div className="p-4 border rounded">Loading orders…</div>;

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-lg font-medium mb-3">My Orders</h2>
      {orders?.length === 0 ? (
        <p className="text-sm text-gray-600">
          You have no orders yet.{" "}
          <a href="/create-order" className="text-blue-600 underline">
            Create one
          </a>
          .
        </p>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o._id || o.id} className="p-3 border rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{o.projectType || "Order"}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-sm">{o.status}</div>
              </div>

              {o.projectBrief && (
                <p className="mt-2 text-sm text-gray-700">
                  {o.projectBrief.slice(0, 200)}
                  {o.projectBrief.length > 200 ? "..." : ""}
                </p>
              )}

              <div className="mt-2 text-xs text-gray-500">
                Attachments: {o.attachments?.length || 0}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserOrders