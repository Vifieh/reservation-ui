export interface ExtraBedPayload {
  numberOfExtraBeds?: number;
  guestExtraBedPayloadList?: GuestExtraBedPayload;
}

export interface GuestExtraBedPayload {
  guestId?: string;
  range?: string;
  unitPrice?: number;
}
