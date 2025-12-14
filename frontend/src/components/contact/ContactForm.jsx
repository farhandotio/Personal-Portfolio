import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../app/features/order/orderSlice';

import { SiFigma, SiReact, SiMongodb } from 'react-icons/si';
import { Globe, Palette, Tablet, Loader2, Upload, Calendar, ChevronDown, Send } from 'lucide-react';
import Loading from '../common/Loading';
import PrimaryButton from '../common/PrimaryButton';

const QUICK_ORDER_TEMPLATES = [
  {
    title: 'Web Design',
    description: 'Creative and responsive UI/UX designs',
    icon: SiFigma,
  },
  {
    title: 'Web Development',
    description: 'Fully functional and responsive websites',
    icon: SiReact,
  },
  {
    title: 'Backend & APIs',
    description: 'Server-side logic and database integration',
    icon: SiMongodb,
  },
];

const TemplateItem = ({ title, description, icon: Icon }) => (
  <div className="p-4 flex flex-col items-center text-center rounded-lg border border-border bg-hoverCardBg transition duration-300 shadow-sm">
    <Icon className="w-6 h-6 text-primary mb-2" />
    <p className="font-semibold text-text text-sm">{title}</p>
    <p className="text-xs text-mutedText mt-0.5">{description}</p>
  </div>
);

const FileUpload = ({ setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      setFileCount(files.length);
      setFiles(files);
    },
    [setFiles]
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileCount(files.length);
    setFiles(files);
  };

  const handleFileInputClick = () => {
    document.getElementById('file-upload').click();
  };

  return (
    <div
      className={`mt-2 border-2 border-dashed p-8 text-center rounded-xl transition-colors duration-300
        ${isDragging ? 'border-primary' : 'border-border bg-hoverCardBg'}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleFileInputClick}
    >
      <Upload className="w-8 h-8 mx-auto text-mutedText mb-3" />
      <p className="text-mutedText text-sm">
        {fileCount > 0
          ? `${fileCount} file(s) ready for submission.`
          : 'Drag and drop files here or click to browse'}
      </p>
      <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
    </div>
  );
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    fullname: '',
    emailAddress: '',
    phoneNumber: '',
    projectType: 'Select project type',
    budgetRange: 'Select budget',
    projectDeadline: '',
    projectBrief: '',
    termsAccepted: false,
  });

  const [files, setFiles] = useState([]);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage({ type: '', text: '' });

    if (!formData.termsAccepted) {
      setSubmitMessage({ type: 'error', text: 'You must agree to the terms.' });
      return;
    }

    try {
      // Build FormData for file uploads
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) payload.append(key, value);
      });
      files.forEach((file) => payload.append('files', file));

      const resultAction = await dispatch(createOrder(payload));
      if (createOrder.fulfilled.match(resultAction)) {
        setSubmitMessage({
          type: 'success',
          text: 'Order submitted successfully!',
        });
        setFormData({
          fullname: '',
          emailAddress: '',
          phoneNumber: '',
          projectType: 'Select project type',
          budgetRange: 'Select budget',
          projectDeadline: '',
          projectBrief: '',
          termsAccepted: false,
        });
        setFiles([]);
      } else {
        setSubmitMessage({
          type: 'error',
          text: resultAction.payload || 'Failed to submit order.',
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({ type: 'error', text: 'Something went wrong.' });
    }
  };

  const isSubmitting = status === 'loading';

  return (
    <section className="lg:col-span-2 bg-cardBg p-5 md:p-10 rounded-xl shadow-lg border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold text-text mb-6">Project Details</h2>

        <p className="font-semibold text-text mb-3">Quick Order Templates</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {QUICK_ORDER_TEMPLATES.map((item, index) => (
            <TemplateItem key={index} {...item} />
          ))}
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Full Name *</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 input"
              disabled={isSubmitting}
            />
          </div>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Email Address *</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 input"
              disabled={isSubmitting}
            />
          </div>
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-text">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 input"
              disabled={isSubmitting}
            />
          </div>
          {/* Project Type */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-text">Project Type *</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="w-full p-3 select appearance-none"
              disabled={isSubmitting}
            >
              <option value="Select project type">Select project type</option>
              <option value="Business Website">Business Website</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Landing Page">Landing Page</option>
              <option value="Branding">Branding</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-3 top-3/5 -translate-y-1/2 w-5 h-5 text-mutedText pointer-events-none" />
          </div>
          {/* Budget */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-text">Budget Range *</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              required
              className="w-full p-3 select appearance-none"
              disabled={isSubmitting}
            >
              <option value="Select budget">Select budget</option>
              <option value="Under $100">Under $100</option>
              <option value="$100 - $500">$100 - $500</option>
              <option value="$500 - $1,000">$500 - $1,000</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="Above $5,000">Above $5,000</option>
            </select>
            <ChevronDown className="absolute right-3 top-3/5 -translate-y-1/2 w-5 h-5 text-mutedText pointer-events-none" />
          </div>
          {/* Deadline */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-text">Project Deadline</label>
            <input
              type="date"
              name="projectDeadline"
              value={formData.projectDeadline}
              onChange={handleChange}
              className="input w-full p-3 select appearance-none"
              disabled={isSubmitting}
            />
            <Calendar className="absolute right-3.5 top-3/5 -translate-y-1/2 w-4.5 h-4.5 text-mutedText pointer-events-none" />
          </div>
          {/* Project Brief */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-text">Project Brief *</label>
            <textarea
              name="projectBrief"
              value={formData.projectBrief}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your project..."
              required
              className="textarea w-full p-3 resize-none"
              disabled={isSubmitting}
            ></textarea>
          </div>
          {/* File Upload */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium text-text">Upload Files</label>
            <FileUpload setFiles={setFiles} />
          </div>
        </div>

        {/* Terms */}
        <div className="pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4 checked:bg-primary"
              required
              disabled={isSubmitting}
            />
            <span className="text-sm text-text">
              I agree to the terms and conditions, including 50% upfront payment *
            </span>
          </label>
        </div>

        {/* Submission Message */}
        {submitMessage.text && (
          <div
            className={`p-3 rounded-lg text-sm font-medium ${
              submitMessage.type === 'success'
                ? 'bg-hoverCardBg text-green-700 border border-green-300'
                : 'bg-cardBg text-danger border border-red-300'
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <PrimaryButton
          type="submit"
          text={isSubmitting ? '...' : 'Submit Project Request'}
          size="lg"
          className={`w-full rounded-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        />
      </form>
    </section>
  );
};

export default ContactForm;
