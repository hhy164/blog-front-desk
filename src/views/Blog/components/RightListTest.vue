<template>
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from "./RightList.vue";
export default {
    methods:{
        handleSelect(item){
            console.log(item);
        }
    },
    components:{
        RightList,
    },
    data(){
        return {
            list:[
                {name:"a",isSelect:false},
                {name:"b",isSelect:true,children:[
                    {name:"b-1",isSelect:false},
                    {name:"b-2",isSelect:false,children:[
                        {name:"b-2-1",isSelect:false}
                    ]},
                ]},
                {name:"c",isSelect:false,children:[
                    {name:"c-1",isSelect:false},
                    {name:"c-2",isSelect:false},
                ]},
                {name:"d",isSelect:false},
            ]
        }
    }
}
</script>

<style>

</style>