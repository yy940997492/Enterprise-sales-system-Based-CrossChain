import { request } from 'umi';

export async function fakeSubmitDetialForm(params: any) {
  return request('/api/sale/customerInformation/followUpRecord', {
    method: 'POST',
    data: params,
  });
}
