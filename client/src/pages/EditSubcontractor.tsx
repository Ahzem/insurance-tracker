import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubcontractorById, updateSubcontractor, type Subcontractor } from '../api/subcontractorApi';
import SubcontractorForm from '../components/SubcontractorForm';

const EditSubcontractor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subcontractor, setSubcontractor] = useState<Subcontractor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubcontractor = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          setError('No subcontractor ID provided');
          return;
        }

        const data = await fetchSubcontractorById(id);
        setSubcontractor(data);
        setError(null);
      } catch (err) {
        setError('Failed to load subcontractor. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubcontractor();
  }, [id]);

  const handleSubmit = async (formData: Omit<Subcontractor, '_id'>) => {
    if (!id) {
      throw new Error('No subcontractor ID provided');
    }
    
    const updatedSubcontractor = await updateSubcontractor(id, formData);
    
    // Navigate back to detail view after successful update
    navigate(`/subcontractors/${id}`);
    
    return updatedSubcontractor;
  };

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
        <h1 className="text-2xl font-bold text-gray-800">Edit Subcontractor</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/subcontractors/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>

      <SubcontractorForm
        initialData={subcontractor}
        onSubmit={handleSubmit}
        submitButtonText="Update Subcontractor"
        isEdit={true}
      />
    </div>
  );
};

export default EditSubcontractor; 