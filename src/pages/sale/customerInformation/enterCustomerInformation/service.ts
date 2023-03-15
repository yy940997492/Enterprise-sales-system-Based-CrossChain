import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/sale/customerInformation/enterCustomerInformation', {
    method: 'POST',
    data: params,
  });
}
