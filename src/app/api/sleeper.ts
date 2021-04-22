import { Activity } from "../../features/modules/activity";

const sleeper = (ms: number) => {
  return function (x: Activity[]) {
    return new Promise<Activity[]>((resolve) =>
      setTimeout(() => resolve(x), ms)
    );
  };
};
export default sleeper;
