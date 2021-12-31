import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Gráficas', url: 'graphic1' },
        { title: 'Promes', url: 'promes' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Ususarios', url: 'users' },
        { title: 'Hospitales', url: 'hospitals' },
        { title: 'Médicos', url: 'doctors' }
      ]
    }
  ];

  constructor() { }
}
