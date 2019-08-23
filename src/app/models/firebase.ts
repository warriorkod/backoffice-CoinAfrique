import { Vendeur } from './vendeur';

export interface Message {
  type: boolean; // true: text, false: image
  body: string;
  messageStatus: number; // 0:pending 1:sent 2:received 3:read
  timestamp: number;
  recipientId: string;
  reverseTimestamp: number;
  messageId: string;
  author: {
    id: string;
    gid: string;
    first_name: string;
    last_name: string;
    user_photo: string;
  };
}

export interface Dialog {
  ad: {
    category: {
      id: number;
      name: string;
      type_category: number;
    };
    description: string;
    state: string; ///
    id: number;
    latitude: number;
    longitude: number;
    // country: {
    //   id: number;
    //   name: string;
    // };
    photo1: {
      normal: string;
      thumb: string;
    };
    photo2: {
      normal: string;
      thumb: string;
    };
    photo3: {
      normal: string;
      thumb: string;
    };
    price: number;
    phone: string;
    title: string;
    type_ad: string; ///
    user: {
      first_name: string;
      last_name: string;
      phone: string;
      user_photo: string;
      id: number;
    };
  };
  lastMessage: Message;
  members: {
    0: Vendeur;
    1: any;
  };
  timestamp: number;
  typing: {
    userId1: boolean; // true: typing, false: not typing
    userId2: boolean; // true: typing, false: not typing
  };
  type: string; // true: moderation, false: support
  status: boolean; // true: opened, false: closed
}

