import swaggerJsdoc from "swagger-jsdoc"; //to read comments in your code and generate a Swagger/OpenAPI specification.
import swaggerUi from "swagger-ui-express"; //This package takes that OpenAPI JSON and creates a beautiful webpage.
const options = {
    definition: {
        openapi: "3.0.0", // API documentation follows the OpenAPI 3.0 specification.
        info: {
            title: "Banking Backend API",
            version: "1.0.0",
            description: "API documentation for the Banking Backend project"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.js"] //it tells swagger-jsdoc "Go through every file inside src/routes and look for Swagger comments."
};

const swaggerSpec = swaggerJsdoc(options);  //This line tells Swagger: "Read all the route files mentioned in apis, generate the OpenAPI specification, and store it in swaggerSpec."

export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};