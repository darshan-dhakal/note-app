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
      <div className="section-shell py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="glass-card flex flex-col items-start gap-8 rounded-3xl p-8 sm:flex-row sm:items-center">
            <div className="relative group">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover shadow-md sm:h-36 sm:w-36"
                />
              ) : (
                <FaUserCircle className="h-32 w-32 text-slate-300 dark:text-slate-600 sm:h-36 sm:w-36" />
              )}
              <button
                onClick={handleUploadClick}
                className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:bg-blue-700"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold dark:text-white sm:text-4xl">{user?.name}</h1>
              <p className="mt-1 text-slate-500 dark:text-slate-300">{user?.email}</p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Keep your profile photo up to date so your workspace stays personal and easy to identify.</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h2 className="mb-6 text-2xl font-semibold dark:text-white">Account Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Full Name</p>
                <p className="text-lg font-medium dark:text-white">{user?.name || "-"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                <p className="text-lg font-medium dark:text-white">{user?.email || "-"}</p>
              </div>

              {user?.phone && (
                <div className="space-y-1">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Phone Number</p>
                  <p className="text-lg font-medium dark:text-white">{user.phone}</p>
                </div>
              )}

              {user?.bio && (
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Bio</p>
                  <p className="text-lg font-medium dark:text-white">{user.bio}</p>
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {showCropper && selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
              <div className="flex items-center justify-between bg-slate-900 p-4 text-white dark:bg-slate-950">
                <h3 className="text-lg font-semibold">Crop Avatar</h3>
              </div>

              <div className="relative h-96 w-full bg-slate-100 dark:bg-slate-700">
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

              <div className="border-t bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-700">
                <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(e.target.value)}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-300 dark:bg-slate-600"
                />
              </div>

              <div className="flex gap-3 border-t bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-700">
                <button
                  onClick={handleCropCancel}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-500 py-2 font-medium text-white transition hover:bg-slate-600"
                >
                  <FaTimes className="text-lg" />
                  Cancel
                </button>
                <button
                  onClick={createCroppedImage}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  <FaCheck className="text-lg" />
                  Crop
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedFile && !showCropper && (
          <div className="fixed bottom-6 right-6 z-40 flex gap-3">
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreview(user?.avatarUrl || null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="flex items-center gap-2 rounded-lg bg-slate-500 px-4 py-2 font-medium text-white shadow-lg transition hover:bg-slate-600"
            >
              <FaTimes /> Cancel
            </button>
            <button
              onClick={handleSavePhoto}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
            >
              <FaCheck /> {loading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
        )}
      </div>
    </Layouts>
  );
}
