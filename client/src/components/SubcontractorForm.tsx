import { useState, useEffect } from 'react';
import CertificatesUpload from './CertificatesUpload';
import type { Subcontractor } from '../api/subcontractorApi';
import { uploadSubcontractorCertificate } from '../api/uploadApi';

interface SubcontractorFormProps {
  initialData?: Subcontractor;
  onSubmit: (formData: Omit<Subcontractor, '_id'>) => Promise<Subcontractor>;
  submitButtonText: string;
  isEdit?: boolean;
}

const SubcontractorForm = ({ 
  initialData, 
  onSubmit, 
  submitButtonText = 'Save',
  isEdit = false
}: SubcontractorFormProps) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    insuranceContactName: '',
    insuranceContactEmail: '',
    insuranceContactPhone: '',
    insuranceAgencyName: ''
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If initialData is provided (edit mode), populate the form
  useEffect(() => {
    if (initialData) {
      setFormData({
        businessName: initialData.businessName || '',
        contactFirstName: initialData.contactFirstName || '',
        contactLastName: initialData.contactLastName || '',
        contactEmail: initialData.contactEmail || '',
        contactPhone: initialData.contactPhone || '',
        insuranceContactName: initialData.insuranceContactName || '',
        insuranceContactEmail: initialData.insuranceContactEmail || '',
        insuranceContactPhone: initialData.insuranceContactPhone || '',
        insuranceAgencyName: initialData.insuranceAgencyName || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelect = (file: File | null) => {
    setCertificateFile(file);
    setFileSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFileSuccess(null);
    
    try {
      // Submit the form data using the provided onSubmit function
      const subcontractor = await onSubmit(formData);
      
      // If there's a certificate file selected, send it to the backend
      if (certificateFile && subcontractor._id) {
        try {
          // Send the file to the backend (creates database record)
          const uploadRecord = await uploadSubcontractorCertificate(subcontractor._id, certificateFile);
          console.log('Certificate file processed and record created:', uploadRecord);
          setFileSuccess(`Certificate record created with ID: ${uploadRecord._id}`);
        } catch (fileError: any) {
          console.error('Error sending certificate file:', fileError);
          // We'll continue even if file upload fails
        }
      }
      
      // Form submission was successful - the parent component will handle navigation
      if (!isEdit) {
        // Reset form if it's not in edit mode
        setFormData({
          businessName: '',
          contactFirstName: '',
          contactLastName: '',
          contactEmail: '',
          contactPhone: '',
          insuranceContactName: '',
          insuranceContactEmail: '',
          insuranceContactPhone: '',
          insuranceAgencyName: ''
        });
        setCertificateFile(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save subcontractor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {fileSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {fileSuccess}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="contactFirstName"
                name="contactFirstName"
                value={formData.contactFirstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactLastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="contactLastName"
                name="contactLastName"
                value={formData.contactLastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">Insurance Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="insuranceContactName" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Contact Name
              </label>
              <input
                type="text"
                id="insuranceContactName"
                name="insuranceContactName"
                value={formData.insuranceContactName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="insuranceContactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Contact Email
              </label>
              <input
                type="email"
                id="insuranceContactEmail"
                name="insuranceContactEmail"
                value={formData.insuranceContactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="insuranceContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Contact Phone
              </label>
              <input
                type="tel"
                id="insuranceContactPhone"
                name="insuranceContactPhone"
                value={formData.insuranceContactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="insuranceAgencyName" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Agency Name
              </label>
              <input
                type="text"
                id="insuranceAgencyName"
                name="insuranceAgencyName"
                value={formData.insuranceAgencyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Certificates Upload Component */}
        <CertificatesUpload onFileSelect={handleFileSelect} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : submitButtonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default SubcontractorForm; 