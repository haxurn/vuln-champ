// backend/services/vulnerabilities.service.ts

import * as VulnerabilitiesModel from '../models/vulnerabilities.model';

export const createVulnerability = async (userId: string, data: any, isAdmin: boolean) => {
    if (!isAdmin) {
        throw new Error('Unauthorized: Only admins can create vulnerabilities');
    }
    return await VulnerabilitiesModel.create({ ...data, userId });
};

export const getVulnerabilities = async (userId: string, isAdmin: boolean, filters: any) => { 
    const filter = isAdmin ? {} : { userId }; 
    return await VulnerabilitiesModel.getAll({ ...filter, ...filters });
}

export const getVulnerabilityById = async (id: string, userId: string, isAdmin: boolean) => {
    const vulnerability = await VulnerabilitiesModel.findById(id);
    if (!vulnerability) throw new Error('Vulnerability not found');
    if (!isAdmin && vulnerability.userId !== userId) throw new Error('Unauthorized');
    return vulnerability;
};

export const updateVulnerability = async (
    id: string,
    userId: string,
    isAdmin: boolean,
    updates: any
) => {
    const vulnerability = await VulnerabilitiesModel.findById(id);

    if (!vulnerability) throw new Error('Vulnerability not found');
    if (!isAdmin && vulnerability.userId !== userId) throw new Error('Unauthorized');

    return await VulnerabilitiesModel.update(id, updates);
};

export const deleteVulnerability = async (id: string, isAdmin: boolean) => {
  const vulnerability = await VulnerabilitiesModel.findById(id);
  if (!vulnerability) throw new Error("Vulnerability not found");
  if (!isAdmin) throw new Error("Unauthorized access");
  return VulnerabilitiesModel.remove(id);
};