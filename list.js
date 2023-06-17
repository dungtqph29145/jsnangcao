const API_URL = 'http://localhost:3000/products';
function getPosts(){
    return fetch(API_URL)
    .then(response => response.json());
}
function renderPosts(posts){
    const postList= document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post =>{
        const tr= document.createElement('tr');
        tr.innerHTML = `
            <tr>
                <td>${post.id}</td>
                <td>${post.name}</td>
                <td>${post.price}</td>
            </tr>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(tr);
    })
    
}
getPosts()
        .then(renderPosts);

const submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    fetch(API_URL,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                "name":document.getElementById('prdName').value,
                "price":document.getElementById('price').value
            }
        )
    })
})

function deletePost(id){
    if(!window.confirm('bạn có muốn xóa không'))return;
    return fetch(`${API_URL}/${id}`,{
        method: 'DELETE',
    }).then(response=>response.json());
}