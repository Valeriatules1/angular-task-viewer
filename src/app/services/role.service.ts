import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
    private _currentRole = signal<'ADMIN' | 'WORKER'>('ADMIN');
    currentRole = this._currentRole.asReadonly();

    toggleRole() {
        this._currentRole.set(this._currentRole() === 'ADMIN' ? 'WORKER' : 'ADMIN');
    }
}
