import request from '@/utils/request';

export const testBackend = () => request.get('/test/index');
