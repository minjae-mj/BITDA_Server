declare namespace interfaces {
  interface UserData {
    id: number;
    userName: string;
    email: string;
    userImage: string;
    password: string;
    admin: number;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    drinks?: object[];
  }
}

export = interfaces;
