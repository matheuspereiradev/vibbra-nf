import { Router } from 'express';
import { SettingsController } from '../controllers/Settings.controller';

const routesSettings = Router();

const settingsController = new SettingsController();

routesSettings.get('/', settingsController.show);
routesSettings.put('/', settingsController.update);

export { routesSettings };
