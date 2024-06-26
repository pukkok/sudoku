import React from "react";
import { useRecoilValue } from "recoil";
import { wrongCountAtom } from "../Recoil/SudokuAtom";

function Header () {
    
    const wrongCount = useRecoilValue(wrongCountAtom)

    return(
        <>
            <div>timer <span></span></div>
            <div>틀린 횟수 <span>{wrongCount}/3</span></div>
        </>
    )
}
export default Header