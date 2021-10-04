export function fetchPost (postBody){
    const fetchConfig = {
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST',
    }
    if(postBody)
    {
        fetchConfig.body = JSON.stringify(postBody);
    }

    return fetchConfig;
}


export function fetchGet(){
    const fetchConfig = {
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },        
        method: 'GET',
    }
   

    return fetchConfig;
}