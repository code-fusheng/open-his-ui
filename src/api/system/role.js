import request from '@/utils/request'

// 分页查询
export function listRoleForPage(query) {
  return request({
    url: '/system/role/listRoleForPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addRole(data) {
  return request({
    url: '/system/role/addRole',
    method: 'post',
    params: data
  })
}
// 修改
export function updateRole(data) {
  return request({
    url: '/system/role/updateRole',
    method: 'put',
    params: data
  })
}
// 删除
export function deleteRoleByIds(id) {
  return request({
    url: '/system/role/deleteRoleByIds/' + id,
    method: 'delete'
  })
}
// 查询一个
export function getRoleById(id) {
  return request({
    url: '/system/role/getRoleById/' + id,
    method: 'get'
  })
}
