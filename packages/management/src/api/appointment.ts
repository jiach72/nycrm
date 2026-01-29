import http from './apiClient'

export const appointmentApi = {
    getAppointments: (params: any) => http.get('/appointments', { params }),
    create: (data: any) => http.post('/appointments', data),
    update: (id: string, data: any) => http.put(`/appointments/${id}`, data),
    delete: (id: string) => http.delete(`/appointments/${id}`),
}
