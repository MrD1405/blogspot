import {useState} from "react";
const InputBox=({name,type,id,value,placeholder,icon})=>{
    const [viewPassword,setViewPassword]=useState(false);
    const handleViewPassword=()=>{
        setViewPassword(!viewPassword);
    }
    return(
        <>
            <div className="relative w=[100%] mb-4">
                <input name={name}
                    type={type=="password"? viewPassword?"text":"password":type}
                    placeholder={placeholder}
                    defaultValue={value}
                    id={id}
                    className="input-box"
                />
                <i className={"fi "+icon+" input-icon"}/>
                {type==="password"?
                <i className={"fi fi-rr-eye"+ (!viewPassword?"-crossed":"")+ " input-icon left-[auto] right-4 cursor-pointer"} onClick={handleViewPassword}/>
                :"" }
            </div>
            
        </>

    );
}
export  default InputBox;