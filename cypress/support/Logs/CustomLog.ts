export enum LoggerType {
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
    Debug = 'debug',
    Step = 'step',
    Action = 'action',
    Assertion = 'assertion',
    Success = 'success',
    Api = 'api',
}
export class Logger {
    private getTimeStamp() {
        return new Date().toLocaleTimeString('en-US', { hour12: false });
    }
    private getColorCode(COLOR_CODES: LoggerType): string {
        const colorCodes: Record<LoggerType, string> = {
            [LoggerType.Info]: "\x1b[36m",
            [LoggerType.Error]: "\x1b[31m",
            [LoggerType.Warning]: "\x1b[33m",
            [LoggerType.Debug]: "\x1b[35m",
            [LoggerType.Step]: "\x1b[32m",
            [LoggerType.Action]: "\x1b[34m",
            [LoggerType.Assertion]: "\x1b[37m",
            [LoggerType.Success]: "\x1b[32m",
            [LoggerType.Api]: "\x1b[35m",
        };
        return colorCodes[COLOR_CODES];
    }
    private getIcon(Icons: LoggerType): string {
        const icons: Record<LoggerType, string> = {
            [LoggerType.Info]: "i️",
            [LoggerType.Error]: "❌",
            [LoggerType.Warning]: "⚠️",
            [LoggerType.Debug]: "🔍",
            [LoggerType.Step]: "📝",
            [LoggerType.Action]: "⚙️",
            [LoggerType.Assertion]: "✅",
            [LoggerType.Success]: "✅",
            [LoggerType.Api]: "📡",
        };
        return icons[Icons];
    }
    public log(type: LoggerType, message: string, ...args: any[]) {
        const colorCode = this.getColorCode(type);
        const icon = this.getIcon(type);
        cy.log(
            `${colorCode}[${this.getTimeStamp()}] ${icon} ${type.toUpperCase()}: ${message}`,
            ...args
        );
    }
    public logInfor(message: string, ...args: any[]) {
        this.log(LoggerType.Info, message, ...args);
    }
    public logError(message: string, ...args: any[]) {
        this.log(LoggerType.Error, message, ...args);
    }
    public logWarning(message: string, ...args: any[]) {
        this.log(LoggerType.Warning, message, ...args);
    }
    public logStep(message: string, ...args: any[]) {
        this.log(LoggerType.Step, message, ...args);
    }
    public logAction(message: string, ...args: any[]) {
        this.log(LoggerType.Action, message, ...args);
    }
    public logAssertion(message: string, ...args: any[]) {
        this.log(LoggerType.Assertion, message, ...args);
    }
    public logSuccess(message: string, ...args: any[]) {
        this.log(LoggerType.Success, message, ...args);
    }


}