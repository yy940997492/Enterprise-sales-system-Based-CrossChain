import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/contractManagement/nonBiddingContracts/showContractsInformation', {
    method: 'POST',
    data: params,
  });
}
