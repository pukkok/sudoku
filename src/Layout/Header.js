import React from "react";
import { useRecoilValue } from "recoil";
import { wrongCountAtom } from "../Recoil/SudokuAtom";

function Header () {
    
    const wrongCount = useRecoilValue(wrongCountAtom)

    const timer = setInterval(() => {
        
    }, 1000);

    return(
        <header>
            <p>기회 <span>{wrongCount}/3</span></p>
            <p>시간 <span>00 : 00</span></p>
        </header>
    )
}
export default Header