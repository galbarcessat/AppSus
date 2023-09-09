
export function LongTxt({ txt, length = 100 }) {

  function getTxtToShow() {
    if (txt.length < length) return txt
    else {
      return txt.substring(0, length) + ' ...'
    }
  }

  return (
    <div>
      {getTxtToShow()}
    </div>
  )
}


