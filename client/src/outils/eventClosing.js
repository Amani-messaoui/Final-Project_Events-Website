export default function eventClosing(a,b){

    let day = a.split("-")[2]
    let dayEnd =(Number(day)+Number(b)).toString()
    let newDate=a.split("-").slice(0,2).concat(dayEnd).join("-")
    return newDate
return newDate
}