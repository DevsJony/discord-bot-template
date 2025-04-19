import { Client, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

let discordClient: Client | null = null;

export async function runDiscordBot() {
    discordClient = new Client({
        intents: [],
    });

    // Load handlers
    const handlersDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "handlers");

    let handlersPromises: Promise<void>[] = [];
    for (const handler of readdirSync(handlersDir)) {
        let loadedScript = await import(`./handlers/${handler}`);
        handlersPromises.push(loadedScript.default(discordClient));
    }

    await Promise.all(handlersPromises);

    await discordClient.login(process.env.TOKEN);
}

export function getDiscordClient() {
    if (!discordClient) {
        throw new Error("Discord client has not been initialized.");
    }
    return discordClient;
}
