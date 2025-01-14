export interface SearchResponse {
  searchUsers: Array<SearchUserResponse>,
  searchFiles: Array<SearchFileResponse>
}

export interface SearchUserResponse {
  userId: number,
  username: string
}

export interface SearchFileResponse {
  userId: number,
  fileId: number,
  fileName: string,
  fileContent: Uint8Array
}
