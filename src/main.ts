import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Configurar as opções HTTPS
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '/../certificado/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/../certificado/cert.pem')),
  };

  // Criar a aplicação Nest com HTTPS
  const app = await NestFactory.create(AppModule, { httpsOptions });

  //app.enableCors();
  // Configuração do CORS
  app.enableCors({
    origin: 'https://localhost:3000', // URL da origem permitida
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Define se as credenciais (como cookies) podem ser enviadas
  });

  await app.listen(3333);
  //await app.listen(3333, '0.0.0.0');
}
bootstrap();
