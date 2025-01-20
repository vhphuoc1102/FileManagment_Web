export interface GetFileGroupsParam {
  storageFileKind: number
}

export interface DownloadFileRequest {
  authorId?: number,
  fileIds: number[],
  storageFileType: number
}

export interface GetFilesParam {
  albumId?: number,
  parentDirectoryId?: number,
  isTrash?: boolean,
}

export interface GetMetaParam {
  fileId: number,
  authorId?: number
}

export interface MoveToTrashParam {
  fileIds: Array<number>
}

export interface GetFileDetailShareRequest {
  shareCode?: string,
  fileId?: number
}
