import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddEvent() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    totalSeats: '',
    leftSeats: '',
    tags: '',
    location: '',
    description: '',
    highlights: '',
    organizer: '',
    bannerPath: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [bannerFile, setBannerFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();


  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.totalSeats || isNaN(formData.totalSeats)) newErrors.totalSeats = 'Total seats must be a number';
    if (!formData.leftSeats || isNaN(formData.leftSeats)) newErrors.leftSeats = 'Left seats must be a number';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!bannerFile) newErrors.banner = 'Banner image is required';

    if (bannerFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(bannerFile.type)) {
        newErrors.banner = 'Only JPG, PNG, or WEBP images are allowed';
      }
      if (bannerFile.size > 2 * 1024 * 1024) {
        toast.error('Banner size must be less than 2 MB');
        newErrors.banner = 'Image must be smaller than 2MB';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setFormData(prev => ({ ...prev, tags: e.target.value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Banner size must be less than 2 MB');
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    form.append('banner', bannerFile);

    try {
      await createEvent(form, localStorage.getItem('adminToken'));
      toast.success('Event created successfully!');
      // setStatus('Event created successfully!');
      navigate('/admin');
    } catch (err) {
      toast.error('Failed to create event');
      // setStatus('Failed to create event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      role="main"
      aria-label="Create new event form"
      className="min-h-screen w-full px-6 pb-24 pt-24 bg-gradient-to-br from-[#E0ECFF] via-[#F0F4FF] to-white dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#111827] font-sans text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-screen-sm mx-auto p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl max-md:text-2xl text-center font-extrabold mb-6 text-indigo-700 dark:text-yellow-300 flex items-center justify-center gap-2">
          🎉 Create New Event
        </h1>
        <hr className="mb-10 border-gray-300 dark:border-gray-600" />

        <form onSubmit={handleSubmit} aria-describedby="form-status" className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-6">
            <legend className="sr-only">Event Details</legend>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-semibold">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                aria-required="true"
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Date, Time, Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Date", name: "date", type: "date" },
                { label: "Time", name: "time", type: "time" },
                { label: "Total Seats", name: "totalSeats", type: "number" },
                { label: "Left Seats", name: "leftSeats", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col gap-2">
                  <label htmlFor={name} className="font-semibold">{label}</label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    aria-required="true"
                    className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400"
                  />
                  {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="font-semibold">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                aria-required="true"
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            {/* Tags, Highlights, Organizer */}
            {["tags", "highlights", "organizer"].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label htmlFor={field} className="font-semibold capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={field === "tags" ? handleTagsChange : handleChange}
                  className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
            ))}

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-semibold">Description</label>
              <textarea
                name="description"
                id="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write event description..."
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
              />
            </div>

            {/* Banner Upload */}
            <div className="flex flex-col gap-2">
              <label htmlFor="banner" className="font-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                id="banner"
                onChange={(e) => handleBannerUpload(e.target.files[0])}
                aria-required="true"
                className="p-3 border rounded-xl w-full dark:bg-gray-800 dark:border-gray-600"
              />
              {errors.banner && <p className="text-red-500 text-sm">{errors.banner}</p>}
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Image Preview:</p>
                <img src={previewUrl} alt="Preview of uploaded banner" className="max-w-full h-auto rounded-xl shadow-md" />
              </div>
            )}
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? '⏳ Creating...' : '🚀 Create Event'}

          </button>
        </form>
        {/* Status Message */}
        {/* {status && (
          <p
            id="form-status"
            className={`mt-6 text-center font-medium ${status.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            role="status"
          >
            {status}
          </p>
        )} */}
      </div>
    </main>
  );
}

export default AddEvent;