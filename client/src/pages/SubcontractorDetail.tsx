import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSubcontractorById, type Subcontractor } from '../api/subcontractorApi';
import { getSubcontractorUploads, type UploadResponse } from '../api/uploadApi';

const SubcontractorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subcontractor, setSubcontractor] = useState<Subcontractor | null>(null);
  const [uploads, setUploads] = useState<UploadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          setError('No subcontractor ID provided');
          return;
        }

        // Fetch subcontractor details
        const data = await fetchSubcontractorById(id);
        setSubcontractor(data);

        // Fetch related uploads
        try {
          const uploadData = await getSubcontractorUploads(id);
          setUploads(uploadData);
        } catch (uploadErr) {
          console.error('Error fetching uploads:', uploadErr);
          // Don't fail the whole page if uploads fail
        }

        setError(null);
      } catch (err) {
        setError('Failed to load subcontractor details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error || !subcontractor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Subcontractor not found'}
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/subcontractors')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subcontractor Details</h1>
        <div className="space-x-2">
          <Link
            to={`/subcontractors/${id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-block"
          >
            Edit
          </Link>
          <button
            onClick={() => navigate('/subcontractors')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Business Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                <dd className="mt-1 text-lg text-gray-900">{subcontractor.businessName}</dd>
              </div>
            </dl>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Information</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-lg text-gray-900">{`${subcontractor.contactFirstName} ${subcontractor.contactLastName}`}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-lg text-gray-900">{subcontractor.contactEmail}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-lg text-gray-900">{subcontractor.contactPhone || '-'}</dd>
              </div>
            </dl>
          </div>

          {(subcontractor.insuranceContactName || subcontractor.insuranceAgencyName) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Insurance Information</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcontractor.insuranceAgencyName && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Agency Name</dt>
                    <dd className="mt-1 text-lg text-gray-900">{subcontractor.insuranceAgencyName}</dd>
                  </div>
                )}
                {subcontractor.insuranceContactName && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
                    <dd className="mt-1 text-lg text-gray-900">{subcontractor.insuranceContactName}</dd>
                  </div>
                )}
                {subcontractor.insuranceContactEmail && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                    <dd className="mt-1 text-lg text-gray-900">{subcontractor.insuranceContactEmail}</dd>
                  </div>
                )}
                {subcontractor.insuranceContactPhone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Phone</dt>
                    <dd className="mt-1 text-lg text-gray-900">{subcontractor.insuranceContactPhone}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {uploads.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Certificates</h2>
              <ul className="divide-y divide-gray-200">
                {uploads.map((upload) => (
                  <li key={upload._id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{upload.originalName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(upload.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {upload.url && (
                      <a
                        href={upload.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                      >
                        View
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p>Created: {new Date(subcontractor.createdAt as Date).toLocaleString()}</p>
            {subcontractor.updatedAt && (
              <p>Last Updated: {new Date(subcontractor.updatedAt as Date).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcontractorDetail; 