import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const apiPath = "api";
    app.setGlobalPrefix(apiPath);

    const config = new DocumentBuilder()
        .setTitle("Todo example")
        .setDescription("The Todo Api description")
        .setVersion("1.0")
        .addTag("todos")
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [AppModule],
    });
    SwaggerModule.setup(`${apiPath}/swagger`, app, document);

    await app.listen(8080);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
