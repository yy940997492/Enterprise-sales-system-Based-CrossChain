import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/contractManagement/nonBiddingContracts', {
    method: 'POST',
    data: params,
  });
}
