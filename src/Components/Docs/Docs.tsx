import { useEffect, } from 'react'
import "./Docs.css"
function Docs() {

    useEffect(() => {
        formatCode()
    }, [])



    return (
        <div className='docs'>
            <div className="code">

            </div>
        </div>
    )
}

function formatCode() {
    const code = `npm i node   `

    let formatData = code.split(' ')
    let appendData = ''
    for (let i = 0; i < formatData.length; i++) {
        let data = formatData[i];
        let color = 'black'
        data = data.replace('\n', '<br/>')
        data = data.replace('   ', '&nbsp;')

        if (data === 'npm') {
            color = 'red'
        } else if (data === 'install' || data === 'i') {
            color = 'blue'
        } else if (data === 'import' || data === 'from') {
            color = 'kblue'
        } else if (data.startsWith('"') && data.endsWith('"<br/>')) {
            color = 'darkgreen'
        } else if (data.startsWith('"') && data.endsWith('";<br/>')) {
            color = 'darkgreen'
        } else if (data === "const") {
            color = "darkviolet"
        } else if (formatData[i - 1] !== null) {
            if (formatData[i - 1] === 'const' || formatData[i - 1] === 'let' || formatData[i - 1] === 'var') {
                color = 'red'
            } else if (formatData[i - 1] === 'new') {
                color = 'darkviolet'
            }
        }

        if (data.includes('env.')) {
            let key = data.split('.')[1]
            data = data.replace(key, `<font color='red'>${key}</font>`)
        }

        const formatNumbers = () => {
            let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
            if (data.includes('1') || data.includes('4') || data.includes('7') ||
                data.includes('2') || data.includes('5') || data.includes('8') ||
                data.includes('3') || data.includes('6') || data.includes('9') ||
                data.includes('0')) {
                numbers.forEach((number, i) => {
                    data = data.replace(number, `<font class='number' >${number}</font>`)
                })
            }
        }
        formatNumbers()

        const formatBoolean = () => {
            let bools = ['true', 'false']
            if (data.toLocaleLowerCase().includes('true') || data.toLocaleLowerCase().includes('true')) {
                bools.forEach((bool) => {
                    data = data.replace(bool, `<font style='color:#c70000' >${bool}</font>`)
                })
            }
        }
        formatBoolean()

        data = data.replace('(', `<font style='color:#a89700'>(</font>`)
        data = data.replace(')', `<font style='color:#a89700'>)</font>`)

        data = data.replace('{', `<font style='color:#8600a8'>{</font>`)
        data = data.replace('}', `<font style='color:#8600a8'>}</font>`)

        data = data.replace(';', `<font style='color:#000000'>;</font>`)
        appendData += `<font color="${color}">${data} </font>`
    }
    document.getElementsByClassName('code')[0].innerHTML = appendData
}

export default Docs