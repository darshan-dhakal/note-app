import { useState, useContext, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Layouts } from "../components/Layouts.jsx";
import axios from "axios";

export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [preview, setPreview] = useState(user?.avatarUrl || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setPreview(user?.avatarUrl || null);
  }, [user]);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    document.getElementById("profileUpload").click();
  };
  const handleSavePhoto = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", selectedFile);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.put(
        "https://note-app-hs3i.onrender.com/api/users/avatar",
        formData,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Update preview with returned Cloudinary URL
      setPreview(res.data.avatarUrl);
      setUser((prev) => {
        const updatedUser = { ...prev, avatarUrl: res.data.avatarUrl };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // persist change
        return updatedUser;
      });
      setSelectedFile(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layouts>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Profile Header */}
          <div className="bg-white shadow-lg rounded-3xl p-10 flex gap-10 items-center">
            {/* Avatar */}
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover shadow-sm"
                />
              ) : (
                <FaUserCircle className="w-30 h-30 text-gray-300" />
              )}
            </div>

            {/* User Summary */}
            <div className="flex-1">
              <h1 className="text-4xl font-semibold">{user?.name}</h1>
              {/* <p className="text-gray-500 text-lg">@{user?.username}</p> */}
              <p className="text-gray-500 mt-1">{user?.email}</p>
            </div>
          </div>

          {/* User Detail Panel */}
          <div className="bg-white shadow-md rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="text-lg font-medium">{user?.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-lg font-medium">{user?.email}</p>
              </div>

              {user?.phone && (
                <div className="space-y-1">
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="text-lg font-medium">{user.phone}</p>
                </div>
              )}

              {user?.bio && (
                <div className="space-y-1 col-span-2">
                  <p className="text-gray-500 text-sm">Bio</p>
                  <p className="text-lg font-medium">{user.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white shadow-md p-8 rounded-3xl">
            <h2 className="text-2xl font-semibold mb-4">
              Update Profile Photo
            </h2>

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all group"
            >
              <FaCamera className="text-gray-400 text-5xl group-hover:text-blue-500 transition" />
              <p className="text-gray-600 mt-4 group-hover:text-blue-500">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-gray-400 mt-1">
                PNG or JPG (max 5 MB)
              </p>
            </div>

            {selectedFile && (
              <button
                onClick={handleSavePhoto}
                disabled={loading}
                className="mt-5 bg-blue-600 px-5 py-2 rounded-xl text-white shadow hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Save Photo"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
}
