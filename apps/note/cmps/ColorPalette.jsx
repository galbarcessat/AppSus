const { useRef } = React


export function ColorPalette({ onChangeBGC, handleButtonClick, note }) {


    return (
        <div className="color-palette" >
            <div onClick={() => {
                onChangeBGC(note, '#d3bfdb')
                handleButtonClick()
            }} className="color color1"></div>
            <div onClick={() => {
                onChangeBGC(note, '#d4e3ed')
                handleButtonClick()
            }} className="color color2"></div>
            <div onClick={() => {
                onChangeBGC(note, '#f39f76')
                handleButtonClick()
            }} className="color color3"></div>
            <div onClick={() => {
                onChangeBGC(note, '#faafa7')
                handleButtonClick()
            }} className="color color4"></div>
            <div onClick={() => {
                onChangeBGC(note, '#efeff1')
                handleButtonClick()
            }} className="color color5"></div>
            <div onClick={() => {
                onChangeBGC(note, '#e2f5d3')
                handleButtonClick()
            }} className="color color6"></div>
        </div>
    )


}

