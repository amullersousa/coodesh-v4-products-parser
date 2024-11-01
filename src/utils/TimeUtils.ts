export class TimeUtils {
  public static convertMinutesToSeconds(minutes: number): number {
    return minutes * 60
  }

  public static convertSecondsToMinutes(seconds: number): number {
    return Math.floor(seconds / 60)
  }
}
