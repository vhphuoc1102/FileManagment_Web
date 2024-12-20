export interface FolderInfo {
  name: string
  directoryId: number
}

export interface FileInfo {
  name: string
  fileId: number
  image?: File,
  file?: Uint8Array
}

export interface FileTimeGroupInfo {
  time: string,
  files: FileInfo[]
}
