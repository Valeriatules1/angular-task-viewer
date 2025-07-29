import { signal } from '@angular/core';
import { USERS } from './mock-data';

// Set current user: change the index to swap between 'Worker' (Alice) and 'Admin' (Charlie)
export const currentUserSignal = signal(USERS[0]); // Alice/Worker
