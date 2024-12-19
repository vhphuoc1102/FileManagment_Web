export interface GetAlbumDto {
  albumId: number;
  albumName: string;
  description: string;
  createdDate: string;
  fileCnt: number;
}

export interface GetAlbumsResponse {
  albums: Map<number, GetAlbumDto>
}
