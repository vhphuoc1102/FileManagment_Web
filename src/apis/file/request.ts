export interface GetFileGroupsParam {
  storageFileKind: number
}

export interface DownloadFileRequest {
  fileIds: number[],
  storageFileType: number
}

export interface GetFilesParam {
  albumId?: number,
  parentDirectoryId?: number,
  isTrash?: boolean,
}

export interface GetMetaParam {
  fileId: number
}

export interface MoveToTrashParam {
  fileIds: Array<number>
}

export interface GetFileDetailShareRequest {
  shareCode: string
}
