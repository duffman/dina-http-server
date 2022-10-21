import { IActionError } from "dina-common";
import { IAction }      from "dina-common";
import EventEmitter     from "events";

export enum DinaEventType {
	Log   = "log",
	Error = "error",
	Data  = "Data"
}

export enum DinaLogEventType {
	Info    = "info",
	Warning = "warn",
	Error   = "error",
	Fatal   = "fatal",
	Debug   = "debug",
	Verbose = "verbose",
}

export interface IDinaEvent<T = any> {
	type: DinaEventType
	time?: number;
	source?: any;
	data: IDinaEventData<T>;

	emit(event: IDinaEvent<T>): void;
}

export class DinaEvent<T> implements IDinaEvent<T> {
	public time: number = Date.now();
	public source?: any = this;

	constructor(
		protected emitter: DinaEventEmitter,
		public type: DinaEventType,
		public data: IDinaEventData<T>
	) {
	}

	public emit(event): void {
		if (!this.emitter) {
			throw new Error("ERROR :: DinaEvent :: No emitter assigned");
		}

		this.emitter.emit(this.type, this);
	}
}

export type DinaEventHandler = (event: IDinaEvent) => void;

export interface IDinaEventData<T = any> {
	data: T
}

//

export interface IDinaLogEventData extends IDinaEventData {
	logType: DinaLogEventType;
	message: string;
}

export class DinaLogEvent extends DinaEvent<IDinaLogEventData> implements IDinaEvent<IDinaLogEventData> {
	public type = DinaEventType.Log;

	constructor(
		protected emitter: DinaEventEmitter,
		public data: IDinaLogEventData,
	) {
		super(emitter, DinaEventType.Log, data);
	}

	public emit(): void {
		super.emit(this);
	}
}

//

export class DinaEventEmitter extends EventEmitter {
	constructor() {
		super();
	}

	/**
	 * Overriding the inherited emit method,
	 * restricting it to eventName and event
	 * @param {string} eventName - The name of the event
	 * @param {IDinaEvent} event - The event data object
	 * @returns {boolean} - Result of the event emit
	 */
	public emit<T>(eventName: string, event: IDinaEvent<T>): boolean {
		return super.emit(eventName, event);
	}

	public triggerLogEvent(logEventType: DinaLogEventType, logEventMessage: string) {
		let event: DinaLogEvent = new DinaLogEvent(this, {
			logType: logEventType,
			message: logEventMessage,
			data   : undefined
		});
	}
}
