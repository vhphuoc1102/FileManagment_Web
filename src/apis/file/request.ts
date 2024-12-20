export interface GetFileGroupsParam {
  storageFileKind: number
}

export interface DownloadFileRequest {
  fileIds: number[],
  storageFileType: number
}

export interface GetFilesParam {
  albumId?: number,
  parentDirectoryId?: number
}

export interface GetMetaParam {
  fileId: number
}
