export class Activities {

  id: number;
  name: string;
  description: string;
  duration: number;
  user_id: number;

  constructor(activity:{id?:number, name?:string, description?:string, duration?:number, user_id?:number}) {
    this.id = activity.id||0;
    this.name = activity.name||'';
    this.description = activity.description||'';
    this.duration = activity.duration||0;
    this.user_id = activity.user_id||0;

  }
}

