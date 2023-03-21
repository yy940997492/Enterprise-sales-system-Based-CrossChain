import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/businessOpportunitiesInformation/submitProjectApprovalInformation', {
    method: 'POST',
    data: params,
  });
}
