import { Request as ExpressRequest, Response } from 'express';
import { createVulnerabilitySchema } from '../schemas/vulnerability.schema';
import * as VulnerabilitiesService from '../services/vulnerabilities.service';

interface CustomRequest extends ExpressRequest {
  userId?: string;
  isAdmin?: boolean;
}

export const createVulnerability = async (req: CustomRequest, res: Response): Promise<void> => { 
    try {
        const { userId, isAdmin } = req;
        if (!userId) {
            throw new Error("Unauthorized: User ID is missing");
        }

        if (typeof isAdmin !== 'boolean') {
            throw new Error("Unauthorized: isAdmin flag is missing or invalid");
        }

        const data = req.body;
        const parsedData = createVulnerabilitySchema.parse(data);

        await VulnerabilitiesService.createVulnerability(userId, parsedData, isAdmin);
        res.status(201).json({ message: 'Vulnerability created successfully' });
    } catch (error: any) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const getVulnerabilities = async (req: CustomRequest, res: Response) => { 
    try {
        const { userId, isAdmin } = req;
        if (!userId) {
            throw new Error("Unauthorized: User ID is missing");
        }
        if (typeof isAdmin !== 'boolean') {
            throw new Error("Unauthorized: isAdmin flag is missing or invalid");
        }
        const vulnerabilities = await VulnerabilitiesService.getVulnerabilities(userId, isAdmin, req.query);
        res.status(200).json({ vulnerabilities }); 
    } catch (error: any) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message }); 
        } else {
            res.status(400).json({ message: 'An unknown error occurred' }); 
        }
    }
};

export const getVulnerabilityById = async (req: CustomRequest, res: Response): Promise<void> => { 
    try {
        const { userId, isAdmin } = req;
        if (!userId) {
            throw new Error("Unauthorized: User ID is missing");
        }
        if (typeof isAdmin !== 'boolean') {
            throw new Error("Unauthorized: isAdmin flag is missing or invalid");
        }
        const vulnerability = await VulnerabilitiesService.getVulnerabilityById(req.params.id, userId, isAdmin);
        res.status(200).json({ vulnerability }); 
    } catch (error: any) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message }); 
        } else {
            res.status(400).json({ message: 'An unknown error occurred' }); 
        }
    }
};

export const updateVulnerability = async (req: CustomRequest, res: Response): Promise<void> => { 
    try {
        const { userId, isAdmin } = req;
        if (!userId) {
            throw new Error("Unauthorized: User ID is missing");
        }
        if (typeof isAdmin !== 'boolean') {
            throw new Error("Unauthorized: isAdmin flag is missing or invalid");
        }
        await VulnerabilitiesService.updateVulnerability(req.params.id, userId, isAdmin, req.body);
        res.status(200).json({ message: 'Vulnerability updated successfully' }); 
    } catch (error: any) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' }); 
        }
    }
};

export const deleteVulnerability = async (req: CustomRequest, res: Response): Promise<void> => { 
    try {
        const { userId, isAdmin } = req;
        if (!userId) {
            throw new Error("Unauthorized: User ID is missing");
        }
        if (typeof isAdmin !== 'boolean') {
            throw new Error("Unauthorized: isAdmin flag is missing or invalid");
        }
        await VulnerabilitiesService.deleteVulnerability(req.params.id,  isAdmin);
        res.status(200).json({ message: 'Vulnerability deleted successfully' }); 
    } catch (error: any) {
        console.error(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' }); 
        }
    }
};
