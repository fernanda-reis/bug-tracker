import express, { type Express, type Request, type Response } from "express";
import {
  createBug,
  getAllBugs,
  updateBugStatusAndPriority,
} from "./controllers/BugController.ts";
import { openDB } from "./configDB.ts";

const app: Express = express();
const port = 3000;
app.use(express.json());

openDB(); // Open the database connection when the server starts

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/bugs", (req: Request, res: Response) => {
  createBug(req.body);
  res.json({
    statusCode: 200,
  });
});

app.get("/bugs", async (req: Request, res: Response) => {
  const bugs = getAllBugs();
  res.json({
    statusCode: 200,
    bugs: bugs,
  });
});

app.patch("/bugs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const bug = updateBugStatusAndPriority(Number(id), req.body);
  res.json({
    statusCode: 200,
    bug,
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
