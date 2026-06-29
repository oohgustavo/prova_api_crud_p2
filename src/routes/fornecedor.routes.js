import fornecedorController from "../controllers/fornecedor.controller.js";
import { Router } from "express";

const fornecedorRouter = Router();

fornecedorRouter.get("/fornecedores", fornecedorController.findAllFornecedorController);
fornecedorRouter.get("/fornecedores/:id", fornecedorController.findFornecedorByIdController);
fornecedorRouter.post("/fornecedores", fornecedorController.createFornecedorController);
fornecedorRouter.put("/fornecedores/:id", fornecedorController.updateFornecedorController);
fornecedorRouter.delete("/fornecedores/:id", fornecedorController.deleteFornecedorController);

export default fornecedorRouter;