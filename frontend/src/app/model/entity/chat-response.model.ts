import { ResponseModel } from './response.model';
export class ChatResponseModel extends ResponseModel {
    constructor(public userName: string, public userUrlPicture: string, message: string, event: string) {
      super(message, event);
    }
}
