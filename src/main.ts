import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.enableCors();
  // Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:3000', // URL da origem permitida
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Define se as credenciais (como cookies) podem ser enviadas
  });
  await app.listen(3333);
  //await app.listen(3333, '0.0.0.0');
}
bootstrap();
