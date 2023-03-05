import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/sale/enterCustomerInformation', {
    method: 'POST',
    data: params,
  });
}
