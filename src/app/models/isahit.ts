export interface IsahitToken {
  token: string;
  iss: string;
  exp: number;
}

export interface IsahitTask {
  id: string;
  ad_id: string;
  batch_id: string;
  isahit_task_id: string;
  task_creation: string;
  task_creation_status: string;
  task_status: string;
  task_status_update: string;
  type_task: string;
}

export interface IsahitBatchStats {
  batch_id: number;
  creation: string; // ISO format
  ad_id_lower_range: number;
  ad_id_upper_range: number;
  nbr_tasks_created: number;
  nbr_ads_moderated: number;
  nbr_ads_validated: number;
  nbr_ads_rejected: number;
  nbr_type_tasks?: any;
}

interface IResponseBase {
  links: {
    next: string;
    previous: string;
  };
  count: number;
}

export interface IsahitParameter {
  id: number;
  key: string;
  description: string;
  value: string;
}

export interface IsahitBatchStatsResponse extends IResponseBase {
  results: Array<IsahitBatchStats>;
}

export interface IsahitTasksResponse extends IResponseBase {
  results: Array<IsahitTask>;
}
