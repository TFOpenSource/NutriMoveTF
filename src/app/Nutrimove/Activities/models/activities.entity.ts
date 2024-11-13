export class Activities {

  id: number;
  name: string;
  description: string;
  duration: number;
  user_id: number;

  constructor(activity?: { id?: number; name?: string; description?: string; duration?: number; user_id?: number }) {
    if (activity) {
      this.id = activity.id || 0;
      this.name = activity.name || '';
      this.description = activity.description || '';
      this.duration = activity.duration || 0;
      this.user_id = activity.user_id || 0;
    } else {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.duration = 0;
      this.user_id = 0;
    }
  }
}


