import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Router } from 'express';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.doc.yaml'));  

const setupSwagger = (router: Router) => {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;