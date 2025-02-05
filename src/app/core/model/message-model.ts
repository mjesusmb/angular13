import { Message } from 'primeng/api';

export interface MessageModel extends Message {
    messageType?: MessageTypeEnum;
    collapsedDetail?: string;
    toastr?: boolean;
    groupId?: string;
}

export enum MessageTypeEnum {
    OK = 0,
    Info,
    Error,
    Warning
}

export interface CleanMessagesProperties {
    groupId?: string;
    noGroupId?: string;
    toastr?: boolean;
}
