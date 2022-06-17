import {getBanners} from "@/api/banner";
export default {
    namespaced:true,
    state:{
        loading:false,
        data:[],
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload;
        },
        setData(state,payload){
            state.data = payload;
        }
    },
    actions:{
        async fetchBanner(ctx){
            if(ctx.state.data.length){
                return; //判断当前data是否有值,有值就不去重新拿了
            }
            ctx.commit("setLoading",true);
            const resp = await getBanners(); //获取响应结果
            ctx.commit("setData",resp);
            ctx.commit("setLoading",false);
        }
    }
}