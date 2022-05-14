import React, { useState } from "react";  
const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(false);

    const Icons = (   
        <i className={visible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onMouseLeave ={() => setVisiblity(false)} onMouseDown={() => setVisiblity(visiblity => !visiblity)} onMouseUp={() => setVisiblity(visiblity => !visiblity)} />
    );

    const InputType = visible ? "text" : "password";

    return [InputType, Icons];
};

export default usePasswordToggle;