export interface FolderInfo {
  name: string
  directoryId: number
}

export interface FileInfo {
  name: string
  fileId: number
  image: File
}

export interface FileTimeGroupInfo {
  time: string,
  files: FileInfo[]
}
