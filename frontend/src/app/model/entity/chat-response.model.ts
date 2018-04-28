import { BaseMessageModel } from './base-message.model';
export class ChatResponseModel extends BaseMessageModel {
    constructor(public userName: string, public userUrlPicture: string, message: string, event: string) {
      super(message, event);
    }
}
