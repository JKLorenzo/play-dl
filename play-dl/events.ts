import EventEmitter from 'events';

type PDLEvents = {
    debug: [message: String];
    error: [error: Error];
    uncaughtException: [error: Error];
};

enum Events {
    Debug = 'debug',
    Error = 'error',
    UncaughtException = 'uncaughtException'
}

const events = new EventEmitter();

function emit<Event extends keyof PDLEvents>(eventName: Event, ...args: PDLEvents[Event]) {
    return events.emit(eventName, ...args);
}

function on<Event extends keyof PDLEvents>(eventName: Event, listener: (...args: PDLEvents[Event]) => void) {
    return events.on(eventName, listener as (...args: any[]) => void);
}

function once<Event extends keyof PDLEvents>(eventName: Event, listener: (...args: PDLEvents[Event]) => void) {
    return events.once(eventName, listener as (...args: any[]) => void);
}

process.on('uncaughtException', (e) => emit(Events.UncaughtException, e));

export { Events, emit, on, once };
