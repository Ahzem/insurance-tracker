import Subcontractor, { ISubcontractor } from '../models/subcontractor.model';

export class SubcontractorService {
  /**
   * Create a new subcontractor
   */
  async createSubcontractor(subcontractorData: Omit<ISubcontractor, 'createdAt' | 'updatedAt'>): Promise<ISubcontractor> {
    try {
      const subcontractor = new Subcontractor(subcontractorData);
      return await subcontractor.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('A subcontractor with this email already exists');
      }
      throw error;
    }
  }

  /**
   * Get all subcontractors
   */
  async getAllSubcontractors(): Promise<ISubcontractor[]> {
    try {
      return await Subcontractor.find().sort({ businessName: 1 });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get subcontractor by ID
   */
  async getSubcontractorById(id: string): Promise<ISubcontractor | null> {
    try {
      return await Subcontractor.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update subcontractor
   */
  async updateSubcontractor(id: string, updateData: Partial<ISubcontractor>): Promise<ISubcontractor | null> {
    try {
      return await Subcontractor.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error('A subcontractor with this email already exists');
      }
      throw error;
    }
  }

  /**
   * Delete subcontractor
   */
  async deleteSubcontractor(id: string): Promise<boolean> {
    try {
      const result = await Subcontractor.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw error;
    }
  }
}

export default new SubcontractorService(); 