import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileUser } from "../../app/features/auth/authSlice";

const EditProfileForm = ({ user, onCancel, onSaved }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);
  useEffect(() => {
    setFirstName(user?.fullname?.firstName || "");
    setLastName(user?.fullname?.lastName || "");
    setCompany(user?.company || "");
    setPreview(user?.picture || null);
    setFile(null);
  }, [user]);

  const handleFile = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    const obj = URL.createObjectURL(f);
    setPreview(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (firstName) fd.append("fullname.firstName", firstName);
    if (lastName) fd.append("fullname.lastName", lastName);
    fd.append("company", company || "");
    if (file) fd.append("picture", file);

    const action = await dispatch(updateProfileUser(fd));
    if (updateProfileUser.fulfilled.match(action)) {
      onSaved && onSaved();
    } else {
      console.error("Update failed", action.payload || action.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
      <h2 className="text-lg font-medium mb-3">Edit Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full px-2 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full px-2 py-2 border rounded"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full px-2 py-2 border rounded"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm">Profile picture</label>
          <div className="mt-2 flex items-center gap-3">
            <img
              src={preview || "/default-avatar.png"}
              alt="preview"
              className="w-16 h-16 rounded-full object-cover"
            />
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded border"
        >
          Cancel
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    </form>
  );
};

export default EditProfileForm;
