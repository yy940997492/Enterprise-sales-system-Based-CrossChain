import { request } from 'umi';

export async function fakeSubmitDetailForm(params: any) {
  return request('/api/sale/businessOpportunitiesInformation/showBusinessOpportunities', {
    method: 'POST',
    data: params,
  });
}
