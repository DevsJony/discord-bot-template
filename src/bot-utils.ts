import { ChatInputCommandInteraction, Client, ClientEvents, SlashCommandBuilder, AutocompleteInteraction } from "discord.js";

export interface BotEvent<K extends keyof ClientEvents> {
    name: K;
    once?: boolean | false;
    execute: (client: Client, ...args: ClientEvents[K]) => void;
}

export interface BotCommand {
    data: Pick<SlashCommandBuilder, "name" | "toJSON">;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
}

export function defineBotEvent<T extends keyof ClientEvents>(botEvent: BotEvent<T>) {
    return botEvent;
}
