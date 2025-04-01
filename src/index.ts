import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("Hello, World!");

const client = new Client({
    intents: [],
});

// Load handlers
const handlersDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "handlers");

let handlersPromises: Promise<void>[] = [];
for (const handler of readdirSync(handlersDir)) {
    let loadedScript = await import(`./handlers/${handler}`);
    handlersPromises.push(loadedScript.default(client));
}

await Promise.all(handlersPromises);

await client.login(process.env.TOKEN);
