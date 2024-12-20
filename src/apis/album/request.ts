export interface CreateAlbumRequest {
  name: string;

  description: string;

  fileIds?: Array<number>;
}

export interface UpdateAlbumRequest {
  name: string;
  description: string;
}

export interface ModifyFileAlbumRequest {
  operation: number;
  fileIds: Array<number>;
}
