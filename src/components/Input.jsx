import { forwardRef } from "react";

const Input= forwardRef(function Input({label, textarea, ...props},ref){
    const labelStyle="text-sm font-bold uppercase text-stone-500";
    const classes="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return(
        <p className="text-stone-600 mb-4">
                    <label className={labelStyle}>
                        {label}
                    </label>
                    {textarea ? <textarea ref={ref} className={classes} {...props} /> :
                     <input ref={ref} className={classes} {...props} />}                   
                </p>
    )
});

export default Input;