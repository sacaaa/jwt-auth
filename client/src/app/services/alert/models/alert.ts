export interface Alert {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}
