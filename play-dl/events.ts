import EventEmitter from 'events';

enum PDLEvents {
    debug,
    error,
    unhandledException
}

const events = new EventEmitter();

function emit<Event extends keyof typeof PDLEvents>(eventName: Event, ...args: any[]) {
    return events.emit(eventName, ...args);
}

function on<Event extends keyof typeof PDLEvents>(eventName: Event, listener: (...args: any[]) => void) {
    return events.on(eventName, listener);
}

function once<Event extends keyof typeof PDLEvents>(eventName: Event, listener: (...args: any[]) => void) {
    return events.once(eventName, listener);
}

process.on('unhandledRejection', (e) => emit('unhandledException', e));

export { emit, on, once };
