import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    const config = new DocumentBuilder()
        .setTitle("Movies API")
        .setDescription("The movies API for Q&Q")
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("", app, document)
    await app.listen(3000);
}

bootstrap();
