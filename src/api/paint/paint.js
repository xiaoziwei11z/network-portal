import request from '@/utils/request'
const api_group='paint'
export default{
    findAll(){
        return request({
            url:`/${api_group}`,
            method:'get'
        })
    },
    search(page,size,searchMap){
        return request({
            url:`/${api_group}/search/${page}/${size}`,
            method:'post',
            data:searchMap
        })
    },
    findById(id){
        return request({
            url:`/${api_group}/${id}`,
            method:'get'
        })
    },
    examine(id,state){
        return request({
            url:`/${api_group}/examine/${id}/${state}`,
            method:'put'
        })
    },
    deleteById(id){
        return request({
            url:`/${api_group}/${id}`,
            method:'delete'
        })
    },
    save(paint){
        return request({
            url:`/${api_group}`,
            method:'post',
            data:paint
        })
    },
    pick(pickMap){
      return request({
          url:`/${api_group}/pick`,
          method:'post',
          data:pickMap
      })
    },
}