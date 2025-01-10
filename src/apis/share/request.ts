export interface AddShareRequest {
  resourceId: number,
  resourceKind: number,
  privacy: number,
  expiredTs: string | undefined,
  emails: Array<string>
}
