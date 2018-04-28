import { BaseMessageModel } from './base-message.model';
export class TypingResponseModel extends BaseMessageModel {
    constructor(message: string, event: string) {
      super(message, event);
    }
}
