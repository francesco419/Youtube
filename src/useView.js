const View=(count)=>{
    if(count>10000){
        if(count>100000){
            return `조회수 ${Math.floor(count/10000)}만회`;
        }else{
            return `조회수 ${(count/10000).toFixed(1)}만회`;
        }
    }else{
        if(count<1000){
            return `조회수 ${count}천회`;
        }else{
            return `조회수 ${(count/1000).toFixed(1)}천회`;
        }
    }
}