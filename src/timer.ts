export class Timer {
  private time: number;
  private timeoutId: NodeJS.Timeout | null;
  private interval: number;

  constructor(interval: number) {
    this.time = 0;
    this.timeoutId = null;
    this.interval = interval;
  }

  public get hasEnded(): boolean {
    return this.time <= 0;
  }

  public set(time: number) {
    this.time = Math.max(this.time, time);
    this.clear();
    this.countDown();
  }

  private clear() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  private countDown() {
    this.timeoutId = setTimeout(() => {
      this.time -= this.interval;
      if (!this.hasEnded) {
        this.countDown();
      }
    }, this.interval);
  }
}
