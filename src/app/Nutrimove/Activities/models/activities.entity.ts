export class Activities {

  id: number;
  name: string;
  description: string;
  duration: number;
  constructor(activity:{id?:number, name?:string, description?:string, duration?:number}) {
    this.id = activity.id||0;
    this.name = activity.name||'';
    this.description = activity.description||'';
    this.duration = activity.duration||0;

  }
}

