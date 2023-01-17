
export interface RegisterModel {
    userName: string;
    email: string;
    password: string;
    avatar: {
        file: File;
        fileList: FileList;
    };
}