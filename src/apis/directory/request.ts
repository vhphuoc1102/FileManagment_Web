export interface AddDirectoryRequest {
  parentDirectoryId: number | undefined,
  name: string
}

export interface UpdateDirectoryRequest {
  name: string
}

export interface GetDirectoriesParam {
  parentDirectoryId: number | undefined
}
