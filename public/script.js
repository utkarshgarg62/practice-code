function getData(){
    fetch("/blogs").then((data)=>{
        return data.json(); //converted to object
        })

        .then((objectData)=>{
            console.log(objectData.data[0])
            let Data =objectData.data
            let tableData=""; 
            Data.map((values)=>{
                tableData+=
            `<tr>
            
            <td>${values.title}</td>
            <td>${values.body}</td>
            

            </tr> `;        
            })

            document.getElementById("table_data")
            .innerHTML=tableData;
        })
}

{/* <td>${values._id}</td>
<td>${values.authorId}</td> 
            <td>${values.tags}</td>
            <td>${values.category}</td>
            <td>${values.subcategory}</td>*/}

function delData(){
    fetch("/blogs").then((data)=>{
        return data.json(); //converted to object
        })

        .then((objectData)=>{
            console.log(objectData.data[0])
            let Data =objectData.data
            let tableData=""; 
            Data.map((values)=>{
                tableData+=
            `<tr>
            <td>${values._id}</td>
            <td>${values.title}</td>
            <td>${values.body}</td>
            <td>${values.authorId}</td>
            <td>${values.tags}</td>
            <td>${values.category}</td>
            <td>${values.subcategory}</td>
            <td><button onclick="del(${values._id})">DELETE</button></td>
            </tr> `;        
            })

            document.getElementById("table_data")
            .innerHTML=tableData;
        })
}

function del(_id){
    fetch(`/blogs/${value._id}`,{
        method:'DELETE'
    }).then((result)=>{
        result.json().then((resp)=>{
            console.warn(resp)
            delData()
        })
    })

}