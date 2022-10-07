import PinoService from './core/logger/pino.service.js';
import {Application} from './core/application/application.js';
import UsersController from './modules/users/users.controller.js';

async function bootstrap() {
  const pinoService = new PinoService();
  pinoService.info('🚗 Application started…');

  const userController = new UsersController(pinoService);

  const application = new Application(pinoService, userController);
  await application.init();
}

bootstrap();
