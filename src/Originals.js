import Menu from "./Menu"
import "./test.css"

function Originals(){
    
    const test = [
        {name:'a',
        do:'a'},
        {name:'b',
        do:'b'},
        {name:'c',
        do:'c'},
    ]
        const getContent = (name)=>{
            console.log("test")
            for(let i=0;i<test.length;i++){
                if(name==test[i].name){
                console.log(test[i].do);
                return test.do;
                }
            }
        }
    return(
        <div>
            <Menu/>
            <button className='dot' onClick={()=> getContent('c')}></button>
        </div>
    )
}

export default Originals;