import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { types } from 'pg';

declare const module: any;
async function bootstrap() {
  types.setTypeParser(types.builtins.INT8, (val) => parseInt(val));
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 8000;
  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log(`listening on port ${port}`);
}
bootstrap();
