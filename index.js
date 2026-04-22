const enviar = document.getElementById("butEnviar")


enviar.addEventListener('click', async function(){
    let nome = document.getElementById("nomeCompleto").value
    let email = document.getElementById("emailCorporativo").value
    let datePicker = document.getElementById("date-picker").value


    if(!nome || !email || !datePicker){
        alert("Os dados não podem estar vazios")
        return;
    }

    const dadosEnviar = {
        nome: nome,
        email : email,
        datePicker : datePicker
    }

    try{
    const reponse = await fetch('http://localhost:8083/usuarios',{
        method:"POST",
        headers:{
           "Content-Type": "application/json"
        },body: JSON.stringify(dadosEnviar)
    })
    if(reponse.ok){
        alert("Dados enviados com sucesso")
    }else{
        alert("Erro ao enviar dados")
    }

    nome.value ===""
    email.value === ""
    datePicker.value === ""
    
    }catch{
        console.log(`erro ao enviar dados a API`)
    }


})
