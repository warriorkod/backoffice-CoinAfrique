import { LockService } from "./lock.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ModerateurService } from './moderateur.service';


@Injectable()
export class AnnonceLockService extends LockService {
  constructor(
    protected _http: HttpClient,
    moderateurService: ModerateurService
    ) {
    super(_http, moderateurService)
  }
}
