import { Observable } from "rxjs";
import { EventEnvelope } from "./../../events";

// Replays all events given to it
export class TestClientAdapter {
    constructor(readonly fakedEvents: { [key: string]: {eventType: string, event: any}[] }) {
    }

    submitCommand(commandType: string, command: any): Observable<EventEnvelope> {
        let eventsToReturn = this.fakedEvents[commandType];
        return new Observable<EventEnvelope>(subscriber => {
            for (let event of eventsToReturn) {
                subscriber.next({
                    eventType: event.eventType,
                    event: event.event,
                    cause: {
                        token: ''
                    }
                });
            }

            subscriber.complete();
        });
    }
}
