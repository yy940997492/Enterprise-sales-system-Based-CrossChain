import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/customerInformation/followUpRecord', {
    method: 'POST',
    data: params,
  });
}
