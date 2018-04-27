import { ResponseModel } from './response.model';
export class TypingResponseModel extends ResponseModel {
    constructor(message: string, event: string) {
      super(message, event);
    }
}
