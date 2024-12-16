export interface AddDirectoryRequest {
  parentDirectoryId: number | undefined,
  name: string
}

export interface UpdateDirectoryRequest {
  name: string
}
