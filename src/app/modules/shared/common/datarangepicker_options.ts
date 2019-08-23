/*
Incapsulates commonly used datarangepicker functions
This class should be added as base class to the component, then
functions below can be used in the template
*/

export class DatarangepickerOptions {
  public readonly pickerOptions: any = {
    locale: {
      cancelLabel: 'Réinitialiser',
      applyLabel: 'Appliquer'
    }
  }

  private readonly dateFilterFormat: string = "YYYY-MM-DD[T]HH:mm:ss.SSSSSS"
  private readonly pickerLabelText: string = 'Sélectionner les dates du filtre'

  public pickerLabel: string = 'Sélectionner les dates du filtre'
  public startDateFilter: string = "";
  public endDateFilter: string = "";

  public selectedDate(value: any): void {
    const formattedStart = value.start.format('MM/DD/YYYY')
    const formattedEnd = value.end.format('MM/DD/YYYY')
    this.startDateFilter = value.start.format(this.dateFilterFormat);
    this.endDateFilter = value.end.format(this.dateFilterFormat);

    if (value.start && value.end) {
      this.pickerLabel = `${formattedStart} - ${formattedEnd}`
    }
  }

  public clearDaterangeValues(event: Event): void {
    this.pickerLabel = this.pickerLabelText
    this.startDateFilter = '';
    this.endDateFilter = '';
  }
}
