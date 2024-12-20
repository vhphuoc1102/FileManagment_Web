export interface GetFileItemResponse {
  fileId: number;
  fileName: string;
  contentType: string;
  fileContent: Uint8Array;
}

export interface GetFileGroupResponse {
  uploadTs: string;
  files: Array<GetFileItemResponse>;
}

export interface GetFilesResponse {
  fileId: number;
  fileName: string;
  fileContent: Uint8Array;
}
