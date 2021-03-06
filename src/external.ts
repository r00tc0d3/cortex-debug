import { DebugProtocol } from 'vscode-debugprotocol';
import { ConfigurationArguments, GDBServerController, SWOConfigureEvent, calculatePortMask } from './common';
import * as os from 'os';
import { EventEmitter } from 'events';

export class ExternalServerController extends EventEmitter implements GDBServerController {
    public readonly name: string = 'External';
    public readonly portsNeeded: string[] = [];

    private args: ConfigurationArguments;
    private ports: { [name: string]: number };

    constructor() {
        super();
    }

    public setPorts(ports: { [name: string]: number }): void {
        this.ports = ports;
    }

    public setArguments(args: ConfigurationArguments): void {
        this.args = args;
    }

    public customRequest(command: string, response: DebugProtocol.Response, args: any): boolean {
        return false;
    }

    public initCommands(): string[] {
        const commands: string[] = [
            'interpreter-exec console "set mem inaccessible-by-default off"'
        ];

        return commands;
    }

    public launchCommands(): string[] {
        const commands = [
            'target-download',
            'interpreter-exec console "monitor reset"',
            'enable-pretty-printing'
        ];

        return commands;
    }

    public attachCommands(): string[] {
        const commands = [
            'enable-pretty-printing'
        ];

        return commands;
    }

    public restartCommands(): string[] {
        const commands: string[] = [
            'interpreter-exec console "monitor reset"'
        ];

        return commands;
    }

    public serverExecutable(): string {
        return null;
    }

    public serverArguments(): string[] {
        return [];
    }

    public initMatch(): RegExp {
        return null;
    }

    public serverLaunchStarted(): void {}
    public serverLaunchCompleted(): void {}
    public debuggerLaunchStarted(): void {}
    public debuggerLaunchCompleted(): void {}
}
