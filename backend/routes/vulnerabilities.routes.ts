import { Router } from 'express';
import * as VulnerabilitiesController from '../controllers/vulnerabilities.controller';
import { validateToken } from '../middleware/auth.middleware';
import { checkAdminRole } from '../middleware/role.middleware';

const router = Router();

// Create - Admin only
router.post('/vulnerabilities', validateToken, checkAdminRole, VulnerabilitiesController.createVulnerability);

// Read - All authenticated users (filtered by role in controller)
router.get('/vulnerabilities', validateToken, VulnerabilitiesController.getVulnerabilities);
router.get('/vulnerabilities/:id', validateToken, VulnerabilitiesController.getVulnerabilityById);

// Update and Delete - Admin only
router.patch('/vulnerabilities/:id', validateToken, checkAdminRole, VulnerabilitiesController.updateVulnerability);
router.delete('/vulnerabilities/:id', validateToken, checkAdminRole, VulnerabilitiesController.deleteVulnerability);

export default router;