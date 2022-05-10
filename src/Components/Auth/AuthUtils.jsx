export const formValidator = (form) => {
    let returnData = {}
    console.log(form.length);

    for (let i = 0; i < form.length; i++) {
        const data = form[i]
        if (data.name !== null && data.name !== "") {
            returnData[data.name] = data.value;
        }
    }
    return returnData
}

export const getInputValueWithId = (id) => {
    return document.getElementById(id).value
}
export const asyncButtonListner = (id) => {
    return new Promise((resolve) => {
        document.getElementById(id)?.addEventListener('click', () => {
            resolve()
        })
    })
}
export const getStringSession = (session) => {
    return session + ''
}