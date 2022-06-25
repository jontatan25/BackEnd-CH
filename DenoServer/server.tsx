import ProductosRepo from "./repositories/ProductosRepo.js";
import {
  contentTypeFilter,
  createApp,
  serveStatic,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";
const app = createApp();
app.use(serveStatic("./public"));

// Define route with string pattern.
// Called if request path exactly match "/"
app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/plain",
    }),
    body: "Hello, Servest!",
  });
});
app.get("/users", async (req) => {
  await req.respond(await ProductosRepo.getAll());
});

app.post("/deleteUser", contentTypeFilter("application/json"), async (req) => {
  const bodyJson = (await req.json()) as { id: string };
  await ProductosRepo.delete(bodyJson.id);
});

app.post("/findUser", contentTypeFilter("application/json"), async (req) => {
  const bodyJson = (await req.json()) as { id: string };
  await ProductosRepo.getById(bodyJson.id);
});
app.post("/json", contentTypeFilter("application/json"), async (req) => {
  const bodyJson = (await req.json()) as { name: string; password: string };
  await ProductosRepo.add(bodyJson);
});

// Start listening on port 8899
app.listen({ port: 8899 });
