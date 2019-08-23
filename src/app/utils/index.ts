declare var jQuery: any;

import * as sessionConstants from '../constants/sessions';
import { Audit } from 'app/models/audits';
import swal from 'sweetalert';

interface IAuditStatus {
  [key: string]: string
}

export function copyMessage(val: string): void{
  let selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  // swal("Texte copier", "Le token se trouve désormais dans votre presse-papier", "success");
}

export function dataTableLify() {
  const table = jQuery('.table');
  jQuery('#search-table').keyup(function () {
    table.fnFilter(jQuery(this).val());
  });
  table.dataTable(sessionConstants.DATATABLE_SETTINGS);
}

export function updateURL(paramVal) {
  return '?page='+paramVal+'&page_size=30';
}


export function updateURLParameter(url, param, paramVal) {
  console.log(url);
  let newAdditionalURL = '';
  let tempArray = [""];
  if (url) {
    tempArray = url.split('?');
  }
  const baseURL = tempArray[0];
  const additionalURL = tempArray[1];
  let temp = '';
  if (additionalURL) {
    tempArray = additionalURL.split('&');
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }
  const rows_txt = temp + '' + param + '=' + paramVal + '&page_size=20';
  return baseURL + '?' + newAdditionalURL + rows_txt;
}

export function auditStatusNameFr(audit: Audit): string {
  if (audit.action_flag === 1) { return 'Création'; } 

  const change_message: any = JSON.parse(audit['change_message'] as string);
  if (change_message.new && change_message.old) {
    return auditChangeStatusNameFr(change_message)
  }
}

function auditChangeStatusNameFr(changeMessage: any): string {
  if (!(changeMessage['new']['state'])) {
    return 'Modification';
  } else {
    return auditChangeNewStatusNameFr(changeMessage['new']['state'])
  }
}

function auditChangeNewStatusNameFr(state: string): string {
  const statusNames: IAuditStatus = {
    "2": "Validation",
    "3": "Rejet"
  }

  return statusNames[state] || "Modification"
}

export function adStateFr(state: number): string {
  const statusNames = {
    0: "Incomplète",
    1: "En attente",
    2: "Validée",
    3: "Rejetée",
    4: "Expirée",
    5: "Vendue",
    6: "Supprimée"
  }

  return statusNames[state] || ''
}
