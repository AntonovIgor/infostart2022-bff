import PinoService from './core/logger/pino.service.js';

function bootstrap() {
  const pinoService = new PinoService();
  pinoService.info('🚗 Application started…')
}

bootstrap();
