export const JWT_TOKEN = 'jwtToken'
export const STRIPE_PUBLIC_KEY = 'pk_test_Zy4vrDrBVMAPFThf7gA5Uu3g00ADFriXO0'
export const FB_APP_ID = '192774708560872'
export const GOOGLE_CLIENT_ID = '653333133801-defos54pjqd9rgovqivjj0mjsjajbpca.apps.googleusercontent.com'
export const FILE_PATH = 'files/speech'
// export const DEFAULT_AVATAR_URL =
//   'https://firebasestorage.googleapis.com/v0/b/reactjs-caro-game.appspot.com/o/images%2Favatar%2Fdefault.png?alt=media&token=25d140ac-fad5-4c9c-a506-076ea0110ae7'
export const CUSTOMER_PATH = '/customer'
export const ADMIN_PATH = '/admin'
export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MANAGER_USER: 'MANAGER_USER',
}
export const PERMISSIONS = {
  CSR_USER: 'CSR_USER',
}
export const TOKEN_TYPE = {
  FREE: { name: 'FREE', minutes: 100, viText: 'Miễn phí 10 phút', cssClass: 'badge-success' },
  '50-MINUTES': { name: '50-MINUTES', minutes: 50, viText: '50 phút', cssClass: 'badge-primary' },
  '200-MINUTES': { name: '200-MINUTES', minutes: 200, viText: '200 phút', cssClass: 'badge-light' },
  '500-MINUTES': { name: '500-MINUTES', minutes: 500, viText: '500 phút', cssClass: 'badge-warning' },
}
export const STATUS = {
  PENDING: { name: 'PENDING', viText: 'Chờ xử lý', cssClass: 'data-state-pending' },
  IN_PROGRESS: { name: 'IN_PROGRESS', viText: 'Đang xử lý', cssClass: 'data-state-progress' },
  SUCCESS: { name: 'SUCCESS', viText: 'Thành công', cssClass: 'data-state-approved' },
  FAILURE: { name: 'FAILURE', viText: 'Thất bại', cssClass: 'data-state-canceled' },
  ACCEPTED: { name: 'ACCEPTED', viText: 'Chấp nhận', cssClass: 'data-state-approved' },
  REJECTED: { name: 'REJECTED', viText: 'Từ chối', cssClass: 'data-state-canceled' },
  VALID: { name: true, viText: 'Hợp lệ', cssClass: 'data-state-approved' },
  INVALID: { name: false, viText: 'Có vấn đề', cssClass: 'data-state-canceled' },
  ACTIVE: { name: true, viText: 'Đang hoạt động', cssClass: 'data-state-approved' },
  INACTIVE: { name: false, viText: 'Đã bị xoá', cssClass: 'data-state-canceled' },
  UNEXPIRED: { name: 'UNEXPIRED', viText: 'Có thể sử dụng', cssClass: 'data-state-approved' },
  EXPIRED: { name: 'EXPIRED', viText: 'Hết hạn sử dụng', cssClass: 'data-state-canceled' },
  // -canceled -missing
}
export const ORDER_STATUS = {
  PENDING: { name: 'PENDING', viText: 'Đang xử lý', cssClass1: 'badge-warning', cssClass2: 'data-state-progress' },
  SUCCESS: { name: 'SUCCESS', viText: 'Thành công', cssClass1: 'badge-success', cssClass2: 'data-state-approved' },
  FAILURE: { name: 'FAILURE', viText: 'Thất bại', cssClass1: 'badge-danger', cssClass2: 'data-state-canceled' },
  // -canceled -missing
}
export const DEFAULT_ERR_MESSAGE = 'Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút.'
export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
}
export const LOADING_LARGE_SIZE = 60
export const LOADING_SMALL_SIZE = 25
export const MAX_INT = 2147483647
export const DEFAULT_PAGINATION = {
  SIZE_100: {
    current: 1,
    pageSize: 100,
  },
  SIZE_10: {
    current: 1,
    pageSize: 10,
  },
  SIZE_5: {
    current: 1,
    pageSize: 5,
  },
  SIZE_MAX_INT: {
    current: 1,
    pageSize: MAX_INT,
  },
  SIZE_TOTAL_COUNT: {
    current: 1,
    pageSize: 1,
  },
}
export const USER_TYPE = {
  NORMAL: 'NORMAL',
  FACEBOOK: 'FACEBOOK',
  GOOGLE: 'GOOGLE',
  TWITTER: 'TWITTER',
}
export const MONETARY_UNIT = 'vnđ'
export const TIMEOUT_MILLISECONDS = 30000
export const FREE_TOKEN = 'API key miễn phí'
