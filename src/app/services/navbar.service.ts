export interface INavStates {
  max: number;
  default: number;
  half?: number;
}

export const NAV_STATES: INavStates = {
  max: 2, // sidebar is hidden
  half: 1, // sidebar is half open
  default: 0 // full opened sidebar
}

export interface INavStateService {
  next(currentState: number): number;
  default(): number;
  states: INavStates;
}

export class SidebarStateService implements INavStateService {
  public states: INavStates;

  constructor(newStates: INavStates) {
    this.states = newStates
  }

  // change navbar to the next available state
  public next(currentState: number): number {
    return currentState >= this.states.max ? this.states.default : currentState + 1
  }

  // default navbar to the default state
  public default(): number {
    return this.states.default
  }
}
