import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";

// Importamos los modelos para que Sequelize los registre.
import { defineAssociations } from "./models/associations";
import "./modules/bicycles/bicycle.model";
import "./modules/brands/brand.model";
import "./modules/bicycle-details/bicycle-detail.model";

async function startServer() {
  try {
    defineAssociations();

    await sequelize.authenticate();

    console.log("Conexión con MySQL establecida.");

    await sequelize.sync();

    console.log("Modelos sincronizados.");

    app.listen(env.PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "No se pudo iniciar la aplicación:",
      error
    );

    process.exit(1);
  }
}

startServer();