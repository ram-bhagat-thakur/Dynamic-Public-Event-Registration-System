import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/eventService';

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [removeBanner, setRemoveBanner] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    getEventById(eventId)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error('Error fetching event:', err));
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBannerUpload = (file) => {
    setBannerFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleBannerUpload(e.dataTransfer.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.date?.trim()) newErrors.date = 'Date is required';
    if (!formData.time?.trim()) newErrors.time = 'Time is required';
    if (!formData.totalSeats || isNaN(formData.totalSeats)) newErrors.totalSeats = 'Total seats must be a number';
    if (!formData.leftSeats || isNaN(formData.leftSeats)) newErrors.leftSeats = 'Left seats must be a number';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';

    if (bannerFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(bannerFile.type)) {
        newErrors.banner = 'Only JPG, PNG, or WEBP images are allowed';
      }
      if (bannerFile.size > 2 * 1024 * 1024) {
        newErrors.banner = 'Image must be smaller than 2MB';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== '_id' && key !== '__v') form.append(key, value);
    });
    if (bannerFile) form.append('banner', bannerFile);
    if (removeBanner) form.append('removeBanner', 'true');

    try {
      await updateEvent(eventId, form, localStorage.getItem('adminToken'));
      setStatus('Event updated successfully!');
      navigate('/admin');
    } catch (err) {
      setStatus('Failed to update event.');
    }
  };

  if (!formData)
    return (
      <p
        role="status"
        aria-live="polite"
        className="text-center mt-10 text-gray-600 dark:text-gray-300"
      >
        Loading event data...
      </p>
    );

  return (
    <main
      role="main"
      aria-label="Edit event form"
      className="pt-28 pb-24 w-screen bg-gradient-to-br from-gray-100 to-white dark:from-[#0F172A] dark:to-[#1E293B]"
    >
      <div className="max-w-2xl mx-auto p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 dark:text-yellow-300 text-center flex items-center justify-center gap-2">
          🛠️ Edit Event
        </h2>
        <hr className="mb-10 border-gray-300 dark:border-gray-600" />

        {formData.bannerPath && !previewUrl && !removeBanner && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Current Banner:</p>
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${formData.bannerPath}`}
              alt="Current Banner"
              className="max-w-full h-auto rounded-xl shadow-md"
            />
            <button
              type="button"
              onClick={() => setRemoveBanner(true)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove Banner
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-describedby="form-status"
          className="flex flex-col gap-6"
        >
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <legend className="sr-only">Event details</legend>
            {['title', 'date', 'time', 'totalSeats', 'leftSeats', 'location'].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label htmlFor={field} className="font-semibold capitalize">
                  {field}
                </label>
                <input
                  type={
                    field.includes('Seats')
                      ? 'number'
                      : field === 'date'
                      ? 'date'
                      : field === 'time'
                      ? 'time'
                      : 'text'
                  }
                  name={field}
                  id={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  aria-invalid={!!errors[field]}
                  aria-describedby={`${field}-error`}
                  required
                  className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
                />
                {errors[field] && (
                  <p id={`${field}-error`} className="text-red-500 text-sm">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </fieldset>

          {['tags', 'highlights', 'organizer'].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field} className="font-semibold capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="6"
              value={formData.description || ''}
              onChange={handleChange}
              className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
            />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="p-6 border-2 border-dashed rounded-xl text-center cursor-pointer dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
            aria-label="Banner upload area"
          >
            <p className="text-sm font-medium">
              📁 Drag & drop banner image here, or click to select
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload(e.target.files[0])}
              className="mt-3"
            />
            {errors.banner && (
              <p className="text-red-500 text-sm mt-2">{errors.banner}</p>
            )}
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="font-semibold mb-2">New Preview:</p>
                            <img
                src={previewUrl}
                alt="New banner preview"
                className="max-w-full h-auto rounded-xl shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            aria-label="Submit updated event"
            aria-busy={status === 'Event updated successfully!'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
          >
            ✅ Update Event
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p
            id="form-status"
            role="status"
            aria-live="polite"
            className={`mt-6 text-center font-medium ${
              status.includes('successfully')
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </main>
  );
}

export default EditEvent;