const socket = io.connect();

function addMessage() {
    const mensaje = {
        author: {
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value,
        date: new Date().toLocaleString()
    }
    socket.emit('new-message', mensaje);
    return false;
}

socket.on('messages', mensajes => {

    const author = new normalizr.schema.Entity('author');
    const post = new normalizr.schema.Entity('post', {
        post: author
    }, { idAttribute: '_id' });
    const posts = new normalizr.schema.Entity('posts', {
        posts: [post]
    });

    const denormalizedData = normalizr.denormalize(mensajes.result, posts, mensajes.entities);

    console.log(mensajes);
    console.log(denormalizedData);

    const denormalizeDataSize = Object.keys(denormalizedData).length;
    const normalizedDataSize = Object.keys(mensajes.result).length;
    const reducedDataPercentage = (normalizedDataSize - denormalizeDataSize) / normalizedDataSize * 100;

    document.getElementById('compresion').innerHTML = `Compresión: ${reducedDataPercentage}%`;

    const html = denormalizedData.mensajes.map((message) => {
        return (`
            <div>
                <strong style="color:blue;">${message.author.name}</strong> <span style="color:brown;">[${message.date}]<span> :
                <em style="color:green;">${message.text}</em> 
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
});