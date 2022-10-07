import PinoService from './core/logger/pino.service.js';
import {Application} from './core/application/application.js';

async function bootstrap() {
  const pinoService = new PinoService();
  pinoService.info('🚗 Application started…');

  const application = new Application(pinoService);
  await application.init();
}

bootstrap();
