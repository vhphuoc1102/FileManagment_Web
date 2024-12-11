export interface CreateAlbumRequest {
 name: string;

 description: string;

 fileIds: Set<number>;
}

export interface UpdateAlbumRequest {
  name: string;
  description: string;
}

export interface ModifyFileAlbumRequest {
  operation: number;
  fileIds: Set<number>;
}
