import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/contractManagement/biddingContracts', {
    method: 'POST',
    data: params,
  });
}
