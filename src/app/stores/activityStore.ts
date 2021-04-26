import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../features/modules/activity";
import agent from "../api/agent";

export default class ActivityStore {
  loading = false;
  activities: Activity[] = [];
  editMode: boolean = false;
  activity: Activity | undefined = undefined;
  submitting: boolean = false;

  constructor() {
    makeAutoObservable(this);
    runInAction(() => {});
  }

  get groupedActivities() {
    return Object.entries(
      this.activities.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  activityDetails = async (id: string) => {
    let activity = this.activities.find((item) => item.id === id);
    if (activity) {
      runInAction(() => {
        this.activity = activity;
      });
      return activity;
    } else {
      runInAction(() => {
        this.loading = true;
      });
      try {
        let ct = await agent.Activities.details(id);
        runInAction(() => {
          this.loading = false;
          this.activity = {
            ...ct,
            date: ct.date.split("T")[0],
          };
        });

        return ct;
      } catch (err) {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  };

  deleteActivity = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Activities.delete(id);
      this.activities = [...this.activities.filter((item) => item.id !== id)];
      runInAction(() => {
        this.submitting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  createOrEditActivity = async (act: Activity) => {
    this.submitting = true;
    const foundActivity = this.activities.find((item) => item.id === act.id);

    if (foundActivity) {
      try {
        await agent.Activities.update(act);
        this.activities = [
          ...this.activities.filter((item) => item.id !== act.id),
          act,
        ];
        runInAction(() => {
          this.editMode = false;
          this.activity = act;
          this.submitting = false;
        });
      } catch (err) {
        runInAction(() => {
          this.submitting = false;
        });
      }
    } else {
      try {
        await agent.Activities.create(act);
        this.activities = [...this.activities, act];
        runInAction(() => {
          this.editMode = false;
          this.activity = act;
          this.submitting = false;
        });
      } catch (err) {
        runInAction(() => {
          this.editMode = false;
        });
      }
    }
  };

  setActivities = async () => {
    this.loading = true;
    try {
      const data = await agent.Activities.list();
      this.activities = data.map((item) => {
        return {
          ...item,
          date: item.date.split("T")[0],
        };
      });

      runInAction(() => {
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
    }
  };
}
