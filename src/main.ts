import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Todo example")
        .setDescription("The Todo Api description")
        .setVersion("1.0")
        .addTag("todos")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/swagger", app, document);

    await app.listen(3000);
}
void bootstrap();
