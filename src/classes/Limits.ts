export type LimitOptions = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export class Limits {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  // totalX: number;
  // totalY: number;

  constructor(properties: LimitOptions) {
    this.startX = properties.startX;
    this.startY = properties.startY;
    this.endX = properties.endX;
    this.endY = properties.endY;
    // NOTE: TBD-- Do we need this?
    // Probably for when the progress values are normalized from 0-1
    // this.totalX = this.endX - this.startX;
    // this.totalY = this.endY - this.startY;
  }
}
