export interface AddShareResponse {
  shareId: number,
  shareCode: string,
  privacy: number,
}

export interface GetShareResponse {
  shareId: number,
  privacy: number,
  emails: Array<string>
}
