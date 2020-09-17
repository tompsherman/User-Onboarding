import React from "react";

function User({details}) {
if (!details){
    return <h3>working...getting user details...</h3>
}

return (
<div>
  <h2>name: {details.name}</h2>
  <p>email: {details.email}</p>
  <p>password: {details.password}</p>
  <p>termsOfService: {details.termsOfService == true ? "agreed" : "not agreed"}</p>
</div>
)
}
export default User;
