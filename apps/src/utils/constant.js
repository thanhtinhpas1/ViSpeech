export const JWT_TOKEN = 'jwtToken'
export const STRIPE_PUBLIC_KEY = 'pk_test_Zy4vrDrBVMAPFThf7gA5Uu3g00ADFriXO0'
export const ITEMS_PER_PAGE = 9
export const IMG_AVATAR_REF = 'images/avatar'
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
  FREE: { name: 'FREE', minutes: 10, viText: 'Miễn phí 10 phút', cssClass: 'badge-success' },
  '50-MINS': { name: '50-MINS', minutes: 50, viText: '50 phút', cssClass: 'badge-primary' },
  '200-MINS': { name: '200-MINS', minutes: 200, viText: '200 phút', cssClass: 'badge-light' },
  '500-MINS': { name: '500-MINS', minutes: 500, viText: '500 phút', cssClass: 'badge-warning' },
}
export const STATUS = {
  PENDING: { name: 'PENDING', viText: 'Đang xử lý', cssClass: 'data-state-progress' },
  SUCCESS: { name: 'SUCCESS', viText: 'Thành công', cssClass: 'data-state-approved' },
  FAILURE: { name: 'FAILURE', viText: 'Thất bại', cssClass: 'data-state-canceled' },
  ACCEPTED: { name: 'ACCEPTED', viText: 'Chấp nhận', cssClass: 'data-state-approved' },
  REJECTED: { name: 'REJECTED', viText: 'Từ chối', cssClass: 'data-state-canceled' },
  // -canceled -missing
}
export const DEFAULT_ERR_MESSAGE = 'Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút.'
