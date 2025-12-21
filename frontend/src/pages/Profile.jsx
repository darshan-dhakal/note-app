import { useState, useContext, useEffect, useRef } from "react";
import { FaUserCircle, FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Layouts } from "../components/Layouts.jsx";
import axios from "axios";
import Cropper from "react-easy-crop";

export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [preview, setPreview] = useState(user?.avatarUrl || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

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
    setShowCropper(true);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createCroppedImage = async () => {
    try {
      const canvas = await getCroppedImg(
        URL.createObjectURL(selectedFile),
        croppedAreaPixels
      );
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], selectedFile.name, {
          type: "image/jpeg",
        });
        setSelectedFile(croppedFile);
        setPreview(canvas.toDataURL());
        setShowCropper(false);
      }, "image/jpeg");
    } catch (err) {
      alert("Failed to crop image");
    }
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        resolve(canvas);
      };
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setPreview(res.data.avatarUrl);
      setUser((prev) => {
        const updatedUser = { ...prev, avatarUrl: res.data.avatarUrl };
        localStorage.setItem("user", JSON.stringify(updatedUser));
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
            <div className="relative group">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover shadow-sm"
                />
              ) : (
                <FaUserCircle className="w-36 h-36 text-gray-300" />
              )}
              <button
                onClick={handleUploadClick}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* User Summary */}
            <div className="flex-1">
              <h1 className="text-4xl font-semibold">{user?.name}</h1>
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

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Image Crop Modal */}
        {showCropper && selectedFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Crop Avatar</h3>
              </div>

              <div className="relative w-full h-96 bg-gray-100">
                <Cropper
                  image={URL.createObjectURL(selectedFile)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                  objectFit="cover"
                />
              </div>

              {/* Zoom Slider */}
              <div className="p-4 bg-gray-50 border-t">
                <label className="text-sm text-gray-600 block mb-2">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 p-4 bg-gray-50 border-t">
                <button
                  onClick={handleCropCancel}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition"
                >
                  <FaTimes className="text-lg" />
                  Cancel
                </button>
                <button
                  onClick={createCroppedImage}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                >
                  <FaCheck className="text-lg" />
                  Crop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Button - Only Show After Cropping */}
        {selectedFile && !showCropper && (
          <div className="fixed bottom-6 right-6 flex gap-3">
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview(user?.avatarUrl || null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition"
            >
              <FaTimes /> Cancel
            </button>
            <button
              onClick={handleSavePhoto}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition disabled:opacity-60"
            >
              <FaCheck /> {loading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
        )}
      </div>
    </Layouts>
  );
}
