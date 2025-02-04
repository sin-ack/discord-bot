import {
    APIMessageContentResolvable,
    Message,
    MessageAdditions,
    MessageOptions,
    MessageEmbed,
} from "discord.js";

/** A user-given command extracted from a message. */
export class CommandParser {
    /** Command name in all lowercase. */
    readonly parsedCommandName: string;
    /** Arguments (split by space). */
    readonly args: string[];
    /** Original Message the command was extracted from. */
    readonly originalMessage: Message;

    readonly commandPrefix: string;

    constructor(message: Message, prefix: string) {
        this.commandPrefix = prefix;
        const splitMessage = message.content
            .slice(prefix.length)
            .replace(/<\S+>/g, "")
            .trim()
            .split(/ +/g);
        const commandName = splitMessage.shift() || "";
        this.parsedCommandName = commandName.toLowerCase();
        this.args = splitMessage;
        this.originalMessage = message;
    }

    embed(): MessageEmbed {
        return new MessageEmbed()
            .setTimestamp()
            .setFooter(`Query by ${this.originalMessage.author.username}`);
    }

    send(
        content:
            | APIMessageContentResolvable
            | (MessageOptions & { split?: false })
            | MessageAdditions
    ): Promise<Message> {
        return this.originalMessage.channel.send(content);
    }
}
