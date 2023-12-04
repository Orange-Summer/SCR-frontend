import { BILL_MODULE } from '@/api/_prefix'

export const getCaseList = (payload: { page: number; size: number }) => {
  const { page, size } = payload
  return axios.get(`${BILL_MODULE}?pageNumber=${page}&pageSize=${size}`).then((res) => {
    return res.data
  })
}

export const getCaseById = (billId: string) => {
  return axios.get(`${BILL_MODULE}/${billId}`).then((res) => {
    return res.data
  })
}

export const getSimilarCase = (billId: string) => {
  return axios.get(`${BILL_MODULE}/similar/${billId}`).then((res) => {
    return res.data
  })
}
