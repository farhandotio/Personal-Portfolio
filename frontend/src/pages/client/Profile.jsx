// File: src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logoutUser } from "../../app/features/auth/authSlice";
import { fetchMyOrders } from "../../app/features/order/orderSlice";
import UserProfile from "../../components/profile/UserProfile";
import EditProfileForm from "../../components/profile/EditProfileForm";
import UserOrders from "../../components/profile/UserOrders";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((s) => s.auth);
  const { myOrders, myStatus } = useSelector((s) => s.order || {});

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (authLoading && !user) return <div className="p-6">Loading profile…</div>;

  return (
    <div className="mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfile
            user={user}
            onEdit={() => setEditing(true)}
            onLogout={() => dispatch(logoutUser())}
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          {editing ? (
            <EditProfileForm
              user={user}
              onCancel={() => setEditing(false)}
              onSaved={() => setEditing(false)}
            />
          ) : (
            <div className="p-4 border rounded">
              <p className="text-sm text-gray-600">
                Click
                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-600 underline ml-1"
                >
                  Edit
                </button>
                to update your profile.
              </p>
            </div>
          )}

          <UserOrders orders={myOrders} status={myStatus} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
