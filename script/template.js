function userTable() {
    let user_list = '';
    for (let i = 0; i < users.length; i++) {
        user_list += `<tr>
            <td>${users[i].name}</td>
            <td>${users[i].category}</td>
            <td>${users[i].mail}</td>
        </tr>`;
        
    }
    return `<table>
    <tr>
        <th>Name</th>
        <th>Category</th>
        <th>email</th>
    </tr>
    ${user_list}
</table>`;
}