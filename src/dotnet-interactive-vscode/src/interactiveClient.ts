import { Observable } from 'rxjs';
import { EventEnvelope } from './events';
import { ClientTransport } from './interfaces';
import { RequestCompletion, RequestHoverText, SubmissionType, SubmitCode } from './commands';

export class InteractiveClient {

    constructor(readonly clientTransport: ClientTransport) {
    }

    completion(language: string, code: string, line: number, character: number): Observable<EventEnvelope> {
        let command: RequestCompletion = {
            code: code,
            position: {
                line,
                character
            },
        };

        return this.clientTransport.submitCommand('RequestCompletion', command, language);
    }

    hover(language: string, code: string, line: number, character: number): Observable<EventEnvelope> {
        let command: RequestHoverText = {
            code: code,
            position: {
                line: line,
                character: character,
            }
        };
        return this.clientTransport.submitCommand('RequestHoverText', command, language);
    }

    submitCode(language: string, code: string): Observable<EventEnvelope> {
        let command: SubmitCode = {
            code: code,
            submissionType: SubmissionType.run,
        };
        return this.clientTransport.submitCommand('SubmitCode', command, language);
    }
}
