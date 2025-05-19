import { useNavigate } from 'react-router-dom';
import { createSubcontractor, type Subcontractor } from '../api/subcontractorApi';
import SubcontractorForm from '../components/SubcontractorForm';

const NewSubcontractor = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: Omit<Subcontractor, '_id'>) => {
    const subcontractor = await createSubcontractor(formData);
    navigate('/subcontractors');
    return subcontractor;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Subcontractor</h1>
        <button
          onClick={() => navigate('/subcontractors')}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>

      <SubcontractorForm
        onSubmit={handleSubmit}
        submitButtonText="Save Subcontractor"
      />
    </div>
  );
};

export default NewSubcontractor; 