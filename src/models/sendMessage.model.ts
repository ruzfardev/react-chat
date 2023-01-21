export interface ISendMessage {
    text: string;
    image: {
        file: File;
        fileList: File[];
    };
}