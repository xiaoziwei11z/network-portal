import request from '@/utils/request'
const api_group='label'
export default{
    findAll(){
        return request({
            url:`/${api_group}`,
            method:'get'
        })
    },
    search(page,size){
        return request({
            url:`/${api_group}/search/${page}/${size}`,
            method:'get'
        })
    },
    findById(id){
        return request({
            url:`/${api_group}/${id}`,
            method:'get'
        })
    },
    deleteById(id){
        return request({
            url:`/${api_group}/${id}`,
            method:'delete'
        })
    },
    save(label){
        return request({
            url:`/${api_group}`,
            method:'post',
            data:label
        })
    },
    updateById(id,label){
        return request({
            url:`/${api_group}/${id}`,
            method:'put',
            data:label
        })
    }
}